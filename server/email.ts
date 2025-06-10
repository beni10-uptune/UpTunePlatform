import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY environment variable must be set");
}

const resend = new Resend(process.env.RESEND_API_KEY);

interface TeamContactEmailParams {
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  teamSize: string;
  message: string;
}

export async function sendTeamContactEmail(params: TeamContactEmailParams): Promise<boolean> {
  try {
    const emailContent = `
New UpTune for Teams Inquiry

Company: ${params.companyName}
Contact Name: ${params.contactName}
Email: ${params.email}
Phone: ${params.phone || 'Not provided'}
Team Size: ${params.teamSize}

Message:
${params.message}

---
Sent from UpTune Teams Contact Form
    `.trim();

    await resend.emails.send({
      from: 'UpTune Teams <noreply@resend.dev>',
      to: ['b10smith5@gmail.com'],
      subject: `New UpTune Teams Inquiry from ${params.companyName}`,
      text: emailContent,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New UpTune for Teams Inquiry</h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Company:</strong> ${params.companyName}</p>
            <p><strong>Contact Name:</strong> ${params.contactName}</p>
            <p><strong>Email:</strong> <a href="mailto:${params.email}">${params.email}</a></p>
            <p><strong>Phone:</strong> ${params.phone || 'Not provided'}</p>
            <p><strong>Team Size:</strong> ${params.teamSize}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #333;">Message:</h3>
            <p style="background: #fff; padding: 15px; border-left: 4px solid #007bff; border-radius: 4px;">
              ${params.message.replace(/\n/g, '<br>')}
            </p>
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">Sent from UpTune Teams Contact Form</p>
        </div>
      `,
    });

    return true;
  } catch (error) {
    console.error('Resend email error:', error);
    return false;
  }
}