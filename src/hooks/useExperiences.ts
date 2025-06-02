
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';
import { useToast } from '@/hooks/use-toast';

type Experience = Tables<'experiences'>;
type ExperienceInsert = TablesInsert<'experiences'>;
type ExperienceUpdate = TablesUpdate<'experiences'>;

export const useExperiences = () => {
  return useQuery({
    queryKey: ['experiences'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('experiences')
        .select(`
          *,
          profiles!experiences_host_id_fkey (
            first_name,
            last_name,
            avatar_url
          )
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });
};

export const useExperience = (id: string) => {
  return useQuery({
    queryKey: ['experience', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('experiences')
        .select(`
          *,
          profiles!experiences_host_id_fkey (
            first_name,
            last_name,
            avatar_url,
            bio
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
};

export const useCreateExperience = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (experience: ExperienceInsert) => {
      const { data, error } = await supabase
        .from('experiences')
        .insert(experience)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experiences'] });
      toast({
        title: "Success",
        description: "Experience created successfully!",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create experience. Please try again.",
        variant: "destructive",
      });
      console.error('Error creating experience:', error);
    },
  });
};
