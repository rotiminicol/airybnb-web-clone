
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
      booking_id,
      payment_method = 'card',
      card_details = {
        number: '**** **** **** 1234',
        expiry: '12/25',
        cvv: '***'
      }
    } = body

    console.log('Processing payment for booking:', booking_id)

    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Mock payment success (90% success rate for testing)
    const paymentSuccess = Math.random() > 0.1

    if (!paymentSuccess) {
      return new Response(
        JSON.stringify({ 
          error: 'Payment failed. Please try again.',
          payment_status: 'failed'
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Update booking status to confirmed and paid
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .update({
        status: 'confirmed',
        updated_at: new Date().toISOString()
      })
      .eq('id', booking_id)
      .eq('guest_id', user.id)
      .select()
      .single()

    if (bookingError) {
      console.error('Error updating booking:', bookingError)
      return new Response(
        JSON.stringify({ error: 'Failed to confirm booking' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create payment record (mock)
    const paymentRecord = {
      id: crypto.randomUUID(),
      booking_id,
      amount: booking.total_price,
      currency: 'USD',
      payment_method,
      status: 'completed',
      transaction_id: `tx_${crypto.randomUUID().slice(0, 8)}`,
      processed_at: new Date().toISOString()
    }

    console.log('Payment processed successfully:', paymentRecord)

    return new Response(
      JSON.stringify({ 
        success: true,
        payment: paymentRecord,
        booking,
        message: 'Payment processed successfully!'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error processing payment:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
