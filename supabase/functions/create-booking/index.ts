
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
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Get the authorization header from the request
    const authHeader = req.headers.get('Authorization')!
    supabase.auth.setSession({
      access_token: authHeader.replace('Bearer ', ''),
      refresh_token: ''
    })

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const body = await req.json()
    const { 
      property_id, 
      experience_id, 
      service_id, 
      check_in, 
      check_out, 
      booking_date, 
      guests, 
      total_price 
    } = body

    // Validate booking data
    if (!total_price || guests < 1) {
      return new Response(
        JSON.stringify({ error: 'Invalid booking data' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check availability (simplified - you might want more complex logic)
    if (property_id) {
      const { data: conflicts } = await supabase
        .from('bookings')
        .select('id')
        .eq('property_id', property_id)
        .eq('status', 'confirmed')
        .gte('check_out', check_in)
        .lte('check_in', check_out)

      if (conflicts && conflicts.length > 0) {
        return new Response(
          JSON.stringify({ error: 'Property not available for selected dates' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
    }

    // Create the booking
    const { data: booking, error } = await supabase
      .from('bookings')
      .insert({
        guest_id: user.id,
        property_id,
        experience_id,
        service_id,
        check_in,
        check_out,
        booking_date,
        guests,
        total_price,
        status: 'pending'
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating booking:', error)
      return new Response(
        JSON.stringify({ error: 'Failed to create booking' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ booking }),
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
