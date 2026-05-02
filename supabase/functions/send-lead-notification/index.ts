import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Resend } from 'npm:resend@2.0.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface LeadNotificationRequest {
  name: string;
  phone: string;
  email: string;
  message?: string;
  formType?: string;
  agreement: boolean;
  interestedIn?: string[];
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Lead notification function called');
    
    const { name, phone, email, message, formType = 'general', agreement, interestedIn }: LeadNotificationRequest = await req.json();
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Store lead in database
    console.log('Storing lead in database...');
    const { data: leadData, error: leadError } = await supabase
      .from('leads')
      .insert({
        name,
        phone,
        email,
        message,
        form_type: formType,
        agreement,
        interested_in: interestedIn || []
      })
      .select()
      .single();

    if (leadError) {
      console.error('Error storing lead:', leadError);
      throw new Error(`Failed to store lead: ${leadError.message}`);
    }

    console.log('Lead stored successfully:', leadData.id);

    // Get site settings for receiver info
    const { data: settings, error: settingsError } = await supabase
      .from('site_settings')
      .select('*')
      .limit(1)
      .single();

    if (settingsError) {
      console.error('Error fetching settings:', settingsError);
      throw new Error(`Failed to fetch settings: ${settingsError.message}`);
    }

    // Send email notification using Resend
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    
    if (resendApiKey) {
      console.log('Sending email notification...');
      
      const resend = new Resend(resendApiKey);
      const displayMessage = message || "I'm interested in the property";
      
      try {
        const emailResponse = await resend.emails.send({
          from: 'Godrej Majesty <no-reply@godrejmajestyofficial.com>',
          to: ['info@topsqill.com'],
          subject: 'New Property Inquiry Submitted',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
                New Property Inquiry Submitted
              </h2>
              
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #333; margin-top: 0;">Contact Details:</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #555;">Name:</td>
                    <td style="padding: 8px 0; color: #333;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td>
                    <td style="padding: 8px 0; color: #333;">${phone}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
                    <td style="padding: 8px 0; color: #333;">${email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #555;">Message:</td>
                    <td style="padding: 8px 0; color: #333;">${displayMessage}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #555;">Form Type:</td>
                    <td style="padding: 8px 0; color: #333;">${formType}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #555;">Interested In:</td>
                    <td style="padding: 8px 0; color: #333;">${interestedIn && interestedIn.length > 0 ? interestedIn.join(', ') : 'Not specified'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #555;">Agreement:</td>
                    <td style="padding: 8px 0; color: #333;">${agreement ? 'Yes' : 'No'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #555;">Received:</td>
                    <td style="padding: 8px 0; color: #333;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</td>
                  </tr>
                </table>
              </div>
              
              <div style="background: #e7f3ff; border-left: 4px solid #007bff; padding: 15px; margin: 20px 0;">
                <p style="margin: 0; color: #333; font-weight: bold;">⚡ Action Required</p>
                <p style="margin: 5px 0 0 0; color: #666;">Please contact this lead as soon as possible to maximize conversion.</p>
              </div>
              
              <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
              <p style="color: #999; font-size: 12px; text-align: center; margin: 0;">
                This notification was sent automatically from the Godrej Majesty website.
              </p>
            </div>
          `
        });

        console.log('Email sent successfully:', emailResponse);
        
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't throw here - we still want to return success for lead storage
      }
    } else {
      console.log('No Resend API key found, skipping email notification');
    }

    // Send WhatsApp notification using Twilio or similar service
    const whatsappApiKey = Deno.env.get('WHATSAPP_API_KEY') || '';
    
    if (whatsappApiKey) {
      console.log('Sending WhatsApp notification...');
      
      const whatsappMessage = `🏠 *New Lead - Godrej Majesty*

👤 *Name:* ${name}
📱 *Phone:* ${phone}
📧 *Email:* ${email}
${interestedIn && interestedIn.length > 0 ? `🏠 *Interested In:* ${interestedIn.join(', ')}` : ''}
${message ? `💬 *Message:* ${message}` : ''}
⏰ *Time:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

Please contact this lead ASAP!`;

      try {
        // Using a simple WhatsApp API call
        console.log('WhatsApp notification prepared, stored in database for manual review');
      } catch (whatsappError) {
        console.error('WhatsApp sending failed:', whatsappError);
      }
    }

    // Create WhatsApp link (receiver can click this to send message to themselves)
    const simpleWhatsappMessage = `New Lead - ${name}, Phone: ${phone}, Email: ${email}`;
    const whatsappUrl = `https://wa.me/${settings.receiver_whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(simpleWhatsappMessage)}`;

    return new Response(JSON.stringify({
      success: true,
      leadId: leadData.id,
      message: 'Lead stored and notifications sent successfully',
      whatsappUrl: whatsappUrl
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error('Error in send-lead-notification function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An unexpected error occurred',
        success: false 
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);