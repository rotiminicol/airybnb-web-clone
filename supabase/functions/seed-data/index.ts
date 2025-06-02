
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

    // Insert sample properties (10 properties)
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
        },
        {
          host_id: demoUser.user.id,
          title: 'Modern Studio in Kensington',
          description: 'Contemporary studio apartment in upscale Kensington neighborhood.',
          property_type: 'apartment',
          location: 'Kensington',
          city: 'London',
          country: 'UK',
          price_per_night: 95.00,
          max_guests: 2,
          bedrooms: 1,
          bathrooms: 1,
          amenities: ['WiFi', 'Kitchen', 'TV', 'Heating'],
          images: ['https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=400&h=300&fit=crop'],
          rating: 4.85,
          review_count: 67,
          is_guest_favorite: false
        },
        {
          host_id: demoUser.user.id,
          title: 'Beachfront Villa in Lekki',
          description: 'Stunning beachfront villa with private pool and ocean views.',
          property_type: 'villa',
          location: 'Lekki Beach',
          city: 'Lekki',
          country: 'Nigeria',
          price_per_night: 180.00,
          max_guests: 8,
          bedrooms: 4,
          bathrooms: 3,
          amenities: ['WiFi', 'Pool', 'Beach access', 'Kitchen', 'Garden', 'Parking'],
          images: ['https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=300&fit=crop'],
          rating: 4.96,
          review_count: 143,
          is_guest_favorite: true
        },
        {
          host_id: demoUser.user.id,
          title: 'Luxury Penthouse in Lekki Phase 1',
          description: 'Exclusive penthouse with panoramic city views and modern amenities.',
          property_type: 'apartment',
          location: 'Lekki Phase 1',
          city: 'Lekki',
          country: 'Nigeria',
          price_per_night: 220.00,
          max_guests: 6,
          bedrooms: 3,
          bathrooms: 2,
          amenities: ['WiFi', 'Kitchen', 'Balcony', 'TV', 'AC', 'Elevator'],
          images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'],
          rating: 4.92,
          review_count: 89,
          is_guest_favorite: true
        },
        {
          host_id: demoUser.user.id,
          title: 'Cozy Bungalow in Lekki',
          description: 'Charming bungalow in quiet residential area with garden.',
          property_type: 'house',
          location: 'Lekki Gardens',
          city: 'Lekki',
          country: 'Nigeria',
          price_per_night: 75.00,
          max_guests: 4,
          bedrooms: 2,
          bathrooms: 2,
          amenities: ['WiFi', 'Kitchen', 'Garden', 'Parking', 'TV'],
          images: ['https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop'],
          rating: 4.78,
          review_count: 156,
          is_guest_favorite: false
        },
        {
          host_id: demoUser.user.id,
          title: 'Safari Lodge in Nairobi',
          description: 'Authentic safari experience with wildlife views from your room.',
          property_type: 'lodge',
          location: 'Nairobi National Park',
          city: 'Nairobi',
          country: 'Kenya',
          price_per_night: 145.00,
          max_guests: 4,
          bedrooms: 2,
          bathrooms: 2,
          amenities: ['WiFi', 'Restaurant', 'Safari tours', 'Wildlife viewing'],
          images: ['https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&h=300&fit=crop'],
          rating: 4.88,
          review_count: 234,
          is_guest_favorite: true
        },
        {
          host_id: demoUser.user.id,
          title: 'Modern Apartment in Westlands',
          description: 'Contemporary apartment in Nairobi\'s business district.',
          property_type: 'apartment',
          location: 'Westlands',
          city: 'Nairobi',
          country: 'Kenya',
          price_per_night: 65.00,
          max_guests: 3,
          bedrooms: 2,
          bathrooms: 1,
          amenities: ['WiFi', 'Kitchen', 'TV', 'Parking', 'Security'],
          images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop'],
          rating: 4.76,
          review_count: 98,
          is_guest_favorite: false
        },
        {
          host_id: demoUser.user.id,
          title: 'Boutique Hotel Room in Karen',
          description: 'Elegant room in boutique hotel with garden views.',
          property_type: 'hotel',
          location: 'Karen',
          city: 'Nairobi',
          country: 'Kenya',
          price_per_night: 89.00,
          max_guests: 2,
          bedrooms: 1,
          bathrooms: 1,
          amenities: ['WiFi', 'Restaurant', 'Garden', 'Room service', 'Spa'],
          images: ['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&h=300&fit=crop'],
          rating: 4.91,
          review_count: 176,
          is_guest_favorite: true
        }
      ])

    if (propertiesError) {
      console.error('Error inserting properties:', propertiesError)
    }

    // Insert sample experiences (10 experiences)
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
        },
        {
          host_id: demoUser.user.id,
          title: 'London Pub Crawl Experience',
          description: 'Explore London\'s historic pubs with local beer tastings.',
          category: 'culture',
          location: 'Soho',
          city: 'London',
          country: 'UK',
          price_per_person: 45.00,
          duration_hours: 4,
          max_participants: 12,
          images: ['https://images.unsplash.com/photo-1564149504025-6fc5b9a6a5ba?w=400&h=300&fit=crop'],
          rating: 4.82,
          review_count: 89
        },
        {
          host_id: demoUser.user.id,
          title: 'British Cooking Class',
          description: 'Learn to cook traditional British dishes with a professional chef.',
          category: 'food',
          location: 'Camden',
          city: 'London',
          country: 'UK',
          price_per_person: 68.00,
          duration_hours: 3,
          max_participants: 8,
          images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop'],
          rating: 4.93,
          review_count: 67
        },
        {
          host_id: demoUser.user.id,
          title: 'Table Mountain Sunrise Hike',
          description: 'Watch the sunrise from Table Mountain with experienced guides.',
          category: 'sports',
          location: 'Table Mountain',
          city: 'Cape Town',
          country: 'South Africa',
          price_per_person: 35.00,
          duration_hours: 5,
          max_participants: 10,
          images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'],
          rating: 4.97,
          review_count: 198
        },
        {
          host_id: demoUser.user.id,
          title: 'Wine Tasting in Stellenbosch',
          description: 'Visit premium wineries and taste award-winning South African wines.',
          category: 'food',
          location: 'Stellenbosch',
          city: 'Cape Town',
          country: 'South Africa',
          price_per_person: 75.00,
          duration_hours: 6,
          max_participants: 15,
          images: ['https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=400&h=300&fit=crop'],
          rating: 4.91,
          review_count: 143
        },
        {
          host_id: demoUser.user.id,
          title: 'Penguin Colony Visit',
          description: 'Meet African penguins at Boulders Beach with marine biologist.',
          category: 'wellness',
          location: 'Boulders Beach',
          city: 'Cape Town',
          country: 'South Africa',
          price_per_person: 42.00,
          duration_hours: 3,
          max_participants: 12,
          images: ['https://images.unsplash.com/photo-1551992146-6d6b2531c0c0?w=400&h=300&fit=crop'],
          rating: 4.89,
          review_count: 167
        },
        {
          host_id: demoUser.user.id,
          title: 'Township Cultural Tour',
          description: 'Experience local culture and history in Cape Town townships.',
          category: 'culture',
          location: 'Langa Township',
          city: 'Cape Town',
          country: 'South Africa',
          price_per_person: 38.00,
          duration_hours: 4,
          max_participants: 8,
          images: ['https://images.unsplash.com/photo-1523905330026-b3005ffc8585?w=400&h=300&fit=crop'],
          rating: 4.85,
          review_count: 211
        },
        {
          host_id: demoUser.user.id,
          title: 'Cage Diving with Great Whites',
          description: 'Thrilling shark cage diving experience with safety experts.',
          category: 'sports',
          location: 'Gansbaai',
          city: 'Cape Town',
          country: 'South Africa',
          price_per_person: 125.00,
          duration_hours: 8,
          max_participants: 6,
          images: ['https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop'],
          rating: 4.94,
          review_count: 89
        },
        {
          host_id: demoUser.user.id,
          title: 'Sunset Yoga on the Beach',
          description: 'Peaceful yoga session on beautiful Camps Bay beach.',
          category: 'wellness',
          location: 'Camps Bay',
          city: 'Cape Town',
          country: 'South Africa',
          price_per_person: 28.00,
          duration_hours: 2,
          max_participants: 20,
          images: ['https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop'],
          rating: 4.87,
          review_count: 134
        }
      ])

    if (experiencesError) {
      console.error('Error inserting experiences:', experiencesError)
    }

    // Insert sample services (10 services)
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
        },
        {
          provider_id: demoUser.user.id,
          title: 'Wedding Photography Package',
          description: 'Complete wedding photography with engagement session included.',
          category: 'photography',
          location: 'Brooklyn',
          city: 'New York',
          country: 'USA',
          price: 850.00,
          rating: 4.92,
          review_count: 67,
          images: ['https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop']
        },
        {
          provider_id: demoUser.user.id,
          title: 'Corporate Headshots by Sarah',
          description: 'Professional headshots for business professionals and executives.',
          category: 'photography',
          location: 'Manhattan',
          city: 'New York',
          country: 'USA',
          price: 125.00,
          rating: 4.88,
          review_count: 156,
          images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop']
        },
        {
          provider_id: demoUser.user.id,
          title: 'Yoga & Meditation Sessions',
          description: 'Private yoga and meditation sessions for stress relief and flexibility.',
          category: 'wellness',
          location: 'Venice Beach',
          city: 'Los Angeles',
          country: 'USA',
          price: 75.00,
          rating: 4.91,
          review_count: 89,
          images: ['https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop']
        },
        {
          provider_id: demoUser.user.id,
          title: 'CrossFit Personal Training',
          description: 'High-intensity CrossFit training with certified instructor.',
          category: 'training',
          location: 'Santa Monica',
          city: 'Los Angeles',
          country: 'USA',
          price: 95.00,
          rating: 4.85,
          review_count: 134,
          images: ['https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=400&h=300&fit=crop']
        },
        {
          provider_id: demoUser.user.id,
          title: 'Massage Therapy Session',
          description: 'Relaxing therapeutic massage for muscle tension and stress relief.',
          category: 'wellness',
          location: 'Midtown',
          city: 'New York',
          country: 'USA',
          price: 110.00,
          rating: 4.94,
          review_count: 198,
          images: ['https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop']
        },
        {
          provider_id: demoUser.user.id,
          title: 'Italian Cooking Masterclass',
          description: 'Learn authentic Italian recipes from a professional chef.',
          category: 'food',
          location: 'Little Italy',
          city: 'New York',
          country: 'USA',
          price: 85.00,
          rating: 4.89,
          review_count: 112,
          images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop']
        },
        {
          provider_id: demoUser.user.id,
          title: 'Swimming Lessons for Adults',
          description: 'Private swimming lessons for adults of all skill levels.',
          category: 'training',
          location: 'Aquatic Center',
          city: 'Miami',
          country: 'USA',
          price: 65.00,
          rating: 4.82,
          review_count: 76,
          images: ['https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=300&fit=crop']
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
