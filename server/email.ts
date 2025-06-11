import sgMail from '@sendgrid/mail';

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
} else {
  console.warn('SENDGRID_API_KEY not found - email functionality will be disabled');
}

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
    // Always log contact form submissions for now (no email service needed)
    console.log('\n=== NEW CONTACT FORM SUBMISSION ===');
    console.log(`Company: ${params.companyName}`);
    console.log(`Contact: ${params.contactName}`);
    console.log(`Email: ${params.email}`);
    console.log(`Phone: ${params.phone || 'Not provided'}`);
    console.log(`Team Size: ${params.teamSize}`);
    console.log(`Message: ${params.message}`);
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log('===================================\n');
    
    // Check if SendGrid is available for future use
    if (!process.env.SENDGRID_API_KEY) {
      return true; // Return success - submissions are logged above
    }

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

    const msg = {
      to: 'b10smith5@gmail.com',
      from: 'noreply@uptune.app', // You'll need to verify this domain in SendGrid
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
    };

    await sgMail.send(msg);
    console.log('Email sent successfully to b10smith5@gmail.com');
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}