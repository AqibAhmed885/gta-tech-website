import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import getSupabaseAdmin from '../../../lib/supabase-server';

export async function POST(request: Request) {
  try {
    // Server-side env validation to avoid HTML error pages and surface JSON errors
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!SUPABASE_URL || !SUPABASE_KEY) {
      return NextResponse.json(
        { error: 'Server misconfiguration: missing Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY).' },
        { status: 500 }
      );
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({ error: 'Supabase client unavailable; check server envs.' }, { status: 500 });
    }

    const body = await request.json();
    const email = (body.email || '').toLowerCase().trim();
    const name = (body.name || '').trim() || null;
    const source = (body.source || 'footer').trim();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ error: 'A valid email is required' }, { status: 400 });
    }

    // Check for existing subscriber
    const { data: existing, error: selectError } = await supabase
      .from('newsletter_subscribers')
      .select('id, status')
      .eq('email', email)
      .maybeSingle();

    if (selectError) console.warn('Supabase select error (ignored):', selectError);

    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const ua = request.headers.get('user-agent') || 'unknown';

    if (existing && existing.status === 'active') {
      return NextResponse.json({ message: 'Already subscribed' }, { status: 200 });
    }

    if (existing) {
      // revive or update subscriber
      const { error: updateError } = await supabase
        .from('newsletter_subscribers')
        .update({ status: 'active', source, ip_address: ip, user_agent: ua, name })
        .eq('email', email);

      if (updateError) {
        console.error('Failed to update existing subscriber:', updateError);
        return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
      }
    } else {
      // create new subscriber
      const { error: insertError } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email, name, source, ip_address: ip, user_agent: ua }]);

      if (insertError) {
        console.error('Failed to insert subscriber:', insertError);
        return NextResponse.json({ error: 'Database insert failed' }, { status: 500 });
      }
    }

    // Send a welcome email (single opt-in)
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 465),
        secure: true,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });

      const html = `
        <div style="font-family: Arial, sans-serif; color: #111;">
          <h2 style="color: #d489ff;">Welcome to GTA Tech Solutions Newslates</h2>
          <p>Hi ${name || ''},</p>
          <p>Thanks for subscribing — you will now receive the latest updates and insights from GTA Tech Solutions.</p>
          <p>If you didn\'t subscribe, you can safely ignore this message.</p>
          <br/>
          <p>— GTA Tech Solutions</p>
        </div>
      `;

      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: email,
        subject: 'Welcome — GTA Tech Solutions Newslates',
        html,
      });
    } catch (mailErr) {
      console.warn('Welcome email failed (non-fatal):', mailErr);
      // do not fail the request if email sending fails
    }

    return NextResponse.json({ success: true, message: 'Subscribed' }, { status: 201 });
  } catch (err) {
    console.error('newslates POST error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
