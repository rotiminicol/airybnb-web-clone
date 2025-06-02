
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Create a demo host profile
    const { data: demoUser, error: profileError } = await supabase.auth.admin.createUser({
      email: 'demo@airbnb.com',
      password: 'demo123456',
      email_confirm: true,
      user_metadata: {
        first_name: 'Demo',
        last_name: 'Host'
      }
    })

    if (profileError) {
      console.error('Error creating demo user:', profileError)
      return new Response(
        JSON.stringify({ error: 'Failed to create demo user' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Insert sample properties
    const { error: propertiesError } = await supabase
      .from('properties')
      .insert([
        {
          host_id: demoUser.user.id,
          title: 'Cozy Apartment in Central London',
          description: 'Beautiful modern apartment with great city views and all amenities you need for a comfortable stay.',
          property_type: 'apartment',
          location: 'Central London',
          city: 'London',
          country: 'UK',
          price_per_night: 103.00,
          max_guests: 4,
          bedrooms: 2,
          bathrooms: 1,
          amenities: ['WiFi', 'Kitchen', 'Washing machine', 'TV', 'Air conditioning'],
          images: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop'],
          rating: 4.97,
          review_count: 125,
          is_guest_favorite: true
        },
        {
          host_id: demoUser.user.id,
          title: 'Private Room in Shoreditch',
          description: 'Stylish room in trendy Shoreditch area, perfect for exploring London.',
          property_type: 'room',
          location: 'Shoreditch',
          city: 'London',
          country: 'UK',
          price_per_night: 87.00,
          max_guests: 2,
          bedrooms: 1,
          bathrooms: 1,
          amenities: ['WiFi', 'Shared kitchen', 'TV'],
          images: ['https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=300&fit=crop'],
          rating: 4.89,
          review_count: 98,
          is_guest_favorite: true
        },
        {
          host_id: demoUser.user.id,
          title: 'Luxury Condo with Thames View',
          description: 'Premium condo overlooking the Thames with luxury amenities.',
          property_type: 'condo',
          location: 'Canary Wharf',
          city: 'London',
          country: 'UK',
          price_per_night: 156.00,
          max_guests: 6,
          bedrooms: 3,
          bathrooms: 2,
          amenities: ['WiFi', 'Kitchen', 'Gym', 'Pool', 'Balcony', 'Concierge'],
          images: ['https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop'],
          rating: 4.94,
          review_count: 87,
          is_guest_favorite: true
        }
      ])

    if (propertiesError) {
      console.error('Error inserting properties:', propertiesError)
    }

    // Insert sample experiences
    const { error: experiencesError } = await supabase
      .from('experiences')
      .insert([
        {
          host_id: demoUser.user.id,
          title: 'London Sightseeing Walking Tour',
          description: 'Discover the best of London on foot with a knowledgeable local guide.',
          category: 'culture',
          location: 'Westminster',
          city: 'London',
          country: 'UK',
          price_per_person: 26.00,
          duration_hours: 3,
          max_participants: 15,
          images: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop'],
          rating: 4.96,
          review_count: 234
        },
        {
          host_id: demoUser.user.id,
          title: 'Thames River Cruise with Dinner',
          description: 'Romantic dinner cruise along the Thames with stunning city views.',
          category: 'food',
          location: 'Thames',
          city: 'London',
          country: 'UK',
          price_per_person: 85.00,
          duration_hours: 4,
          max_participants: 50,
          images: ['https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=300&fit=crop'],
          rating: 4.88,
          review_count: 156
        }
      ])

    if (experiencesError) {
      console.error('Error inserting experiences:', experiencesError)
    }

    // Insert sample services
    const { error: servicesError } = await supabase
      .from('services')
      .insert([
        {
          provider_id: demoUser.user.id,
          title: 'Stylish vintage car photo shoot Tour',
          description: 'Professional photography session with vintage cars in beautiful locations.',
          category: 'photography',
          location: 'Central Rome',
          city: 'Rome',
          country: 'Italy',
          price: 62.00,
          rating: 4.89,
          review_count: 45,
          images: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop']
        },
        {
          provider_id: demoUser.user.id,
          title: 'Total Body Training by Peter',
          description: 'Personal fitness training session to help you achieve your goals.',
          category: 'training',
          location: 'Pasadena',
          city: 'Pasadena',
          country: 'USA',
          price: 90.00,
          rating: 4.87,
          review_count: 78,
          images: ['https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop']
        },
        {
          provider_id: demoUser.user.id,
          title: 'The Vegan Experience: Plant Based Private Chef',
          description: 'Private chef service specializing in delicious vegan cuisine.',
          category: 'food',
          location: 'Downtown',
          city: 'Los Angeles',
          country: 'USA',
          price: 50.00,
          rating: 4.96,
          review_count: 123,
          images: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop']
        }
      ])

    if (servicesError) {
      console.error('Error inserting services:', servicesError)
    }

    return new Response(
      JSON.stringify({ 
        message: 'Sample data created successfully',
        demoUser: {
          email: 'demo@airbnb.com',
          password: 'demo123456'
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
