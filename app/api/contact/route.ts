import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const { name, email, company, phone, service, message } = await request.json();

        // Basic server-side validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Name, email, and message are required' },
                { status: 400 }
            );
        }

        // Configure transporter
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Email content
        // Admin Email Options
        const adminMailOptions = {
            from: process.env.SMTP_FROM,
          to: 'info@gtatechsolutions.com',
            replyTo: email,
            subject: `New Contact Form Submission from ${name}`,
            text: `
        Name: ${name}
        Email: ${email}
        Company: ${company || 'N/A'}
        Phone: ${phone || 'N/A'}
        Service Interested: ${service || 'N/A'}
        
        Message:
        ${message}
      `,
            html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Service Interested:</strong> ${service || 'N/A'}</p>
        <br/>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
        };

        // User Autoreply Options (Styled)
        const autoreplyHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You for Contacting GTA Tech Solutions</title>
        <style>
          body { margin: 0; padding: 0; background-color: #000000; font-family: 'Arial', sans-serif; color: #ffffff; }
          .container { max-width: 600px; margin: 0 auto; background-color: #111111; border-radius: 16px; overflow: hidden; border: 1px solid #333333; }
          .header { padding: 40px 20px; text-align: center; background: linear-gradient(180deg, rgba(95,175,221,0.1) 0%, rgba(0,0,0,0) 100%); }
          .logo { font-size: 24px; font-weight: bold; color: #ffffff; text-decoration: none; }
          .logo span { color: #d489ff; }
          .content { padding: 40px 30px; text-align: left; line-height: 1.6; color: #cccccc; }
          .h1 { color: #ffffff; font-size: 24px; margin-bottom: 20px; }
          .highlight { color: #d489ff; }
          .button { display: inline-block; padding: 12px 24px; margin-top: 20px; background: linear-gradient(90deg, #d489ff 0%, #a200ff 100%); color: #001E5F; text-decoration: none; font-weight: bold; border-radius: 50px; }
          .footer { padding: 20px; text-align: center; font-size: 12px; color: #666666; border-top: 1px solid #222222; background-color: #050505; }
        </style>
      </head>
      <body>
        <div style="padding: 40px 0;">
          <div class="container">
            <div class="header">
              <div class="logo">GTA<span>Tech Solutions</span></div>
            </div>
            <div class="content">
              <h1 class="h1">Hi ${name},</h1>
              <p>Thank you for reaching out to <strong>GTA Tech Solutions</strong>. We have received your message and are excited to learn more about your project.</p>
              
              <p>Our team is currently reviewing your inquiry regarding <span class="highlight">${service || 'our services'}</span>. We usually respond within 24 hours to schedule a consultation or provide the information you need.</p>
              
              <p>In the meantime, feel free to check out our latest work or follow us on social media.</p>
              
              <center>
                <a href="https://gtatechsolutions.com" class="button">Visit Our Website</a>
              </center>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} GTA Tech Solutions. All rights reserved.</p>
              <p>3030 Shadowbriar Dr, Houston, TX 77082, United States</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

        const userAutoreplyOptions = {
            from: process.env.SMTP_FROM,
            to: email,
          subject: `Thank you for contacting GTA Tech Solutions`,
            html: autoreplyHtml,
        };

        // Send Admin Email first
        await transporter.sendMail(adminMailOptions);

        // Send User Autoreply (Fire and forget, or await to be safe)
        try {
            await transporter.sendMail(userAutoreplyOptions);
        } catch (autoreplyError) {
            console.warn('Failed to send autoreply:', autoreplyError);
            // We don't fail the request if autoreply fails, as long as admin received the msg
        }

        return NextResponse.json({ success: true, message: 'Email sent successfully' }, { status: 200 });

    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Failed to send message. Please try again later.' },
            { status: 500 }
        );
    }
}
