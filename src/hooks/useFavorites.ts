
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert } from '@/integrations/supabase/types';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

type Favorite = Tables<'favorites'>;
type FavoriteInsert = TablesInsert<'favorites'>;

export const useFavorites = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['favorites', user?.id],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('favorites')
        .select(`
          *,
          properties (
            title,
            location,
            price_per_night,
            images,
            rating
          ),
          experiences (
            title,
            location,
            price_per_person,
            images,
            rating
          ),
          services (
            title,
            location,
            price,
            images,
            rating
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
};

export const useToggleFavorite = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (params: {
      property_id?: string;
      experience_id?: string;
      service_id?: string;
    }) => {
      if (!user) throw new Error('User not authenticated');

      // Check if already favorited
      const { data: existing, error: checkError } = await supabase
        .from('favorites')
        .select('id')
        .eq('user_id', user.id)
        .eq('property_id', params.property_id || null)
        .eq('experience_id', params.experience_id || null)
        .eq('service_id', params.service_id || null)
        .maybeSingle();

      if (checkError) throw checkError;

      if (existing) {
        // Remove from favorites
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('id', existing.id);

        if (error) throw error;
        return { action: 'removed' };
      } else {
        // Add to favorites
        const { error } = await supabase
          .from('favorites')
          .insert({
            user_id: user.id,
            ...params,
          });

        if (error) throw error;
        return { action: 'added' };
      }
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      toast({
        title: "Success",
        description: `${result.action === 'added' ? 'Added to' : 'Removed from'} favorites!`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update favorites. Please try again.",
        variant: "destructive",
      });
      console.error('Error toggling favorite:', error);
    },
  });
};
