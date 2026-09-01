import { Resend } from 'resend';

export interface ContactRequestBody {
  name: string;
  email: string;
  details?: string;
  message?: string;
  botField?: string;
}

export default async function handler(req: any, res: any) {
  // 1. CORS & Preflight (for Vercel serverless functions)
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed. Only POST requests are accepted.',
    });
  }

  try {
    const body: ContactRequestBody =
      typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};

    const { name, email, details, message, botField } = body;

    // 2. Anti-spam honeypot check
    if (botField) {
      return res.status(200).json({
        success: true,
        message: 'Inquiry received.',
      });
    }

    // 3. Server-side Data Validation
    const cleanName = (name || '').trim();
    const cleanEmail = (email || '').trim();
    const cleanDetails = (details || message || '').trim();

    if (!cleanName) {
      return res.status(400).json({
        success: false,
        error: 'Name is required.',
      });
    }

    if (cleanName.length > 100) {
      return res.status(400).json({
        success: false,
        error: 'Name cannot exceed 100 characters.',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      return res.status(400).json({
        success: false,
        error: 'A valid email address is required.',
      });
    }

    if (cleanEmail.length > 200) {
      return res.status(400).json({
        success: false,
        error: 'Email cannot exceed 200 characters.',
      });
    }

    if (!cleanDetails) {
      return res.status(400).json({
        success: false,
        error: 'Project details are required.',
      });
    }

    if (cleanDetails.length < 5) {
      return res.status(400).json({
        success: false,
        error: 'Project details must be at least 5 characters.',
      });
    }

    if (cleanDetails.length > 5000) {
      return res.status(400).json({
        success: false,
        error: 'Project details cannot exceed 5000 characters.',
      });
    }

    // 4. Retrieve and verify Environment Variables
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL || 'LIBRA TECHLAB <onboarding@resend.dev>';

    if (!apiKey || apiKey === 're_your_resend_api_key_here') {
      console.warn(
        '[LIBRA TECHLAB Contact API] RESEND_API_KEY is not configured in environment variables.'
      );
      return res.status(500).json({
        success: false,
        error:
          'Email service is not configured. Please add a valid RESEND_API_KEY to your environment variables.',
      });
    }

    if (!toEmail || toEmail === 'your_business_email@example.com') {
      console.warn(
        '[LIBRA TECHLAB Contact API] CONTACT_TO_EMAIL is not configured in environment variables.'
      );
      return res.status(500).json({
        success: false,
        error:
          'Recipient business email is not configured. Please add CONTACT_TO_EMAIL to your environment variables.',
      });
    }

    // 5. Send Transactional Email via Resend
    const resend = new Resend(apiKey);

    const emailSubject = 'New Project Inquiry — LIBRA TECHLAB';
    const submissionDate = new Date().toLocaleString('en-US', {
      timeZone: 'UTC',
      dateStyle: 'full',
      timeStyle: 'long',
    });

    const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>New Project Inquiry — LIBRA TECHLAB</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F4F1EA; margin: 0; padding: 32px 16px; color: #1D231A;">
  <div style="max-width: 600px; margin: 0 auto; background: #FFFFFF; border-radius: 16px; border: 1px solid rgba(78, 94, 67, 0.15); box-shadow: 0 8px 32px rgba(45, 55, 35, 0.06); overflow: hidden;">
    
    <!-- Header Banner -->
    <div style="background: #2E3827; padding: 28px 32px; border-bottom: 2px solid #B89343;">
      <h1 style="color: #FAF8F4; font-size: 22px; font-weight: 800; letter-spacing: 0.06em; margin: 0; text-transform: uppercase;">
        LIBRA <span style="color: #D4AF57;">TECHLAB</span>
      </h1>
      <p style="color: #91A186; font-size: 13px; margin: 6px 0 0 0; letter-spacing: 0.08em; text-transform: uppercase;">
        New Project Inquiry Received
      </p>
    </div>

    <!-- Body Content -->
    <div style="padding: 32px;">
      <h2 style="font-size: 18px; color: #1D231A; margin: 0 0 20px 0; font-weight: 700;">
        Inquiry Details
      </h2>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr>
          <td style="padding: 10px 0; width: 140px; font-weight: 700; color: #4E5E43; font-size: 14px; text-transform: uppercase;">
            Visitor Name:
          </td>
          <td style="padding: 10px 0; color: #1D231A; font-size: 15px; font-weight: 600;">
            ${escapeHtml(cleanName)}
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; font-weight: 700; color: #4E5E43; font-size: 14px; text-transform: uppercase;">
            Visitor Email:
          </td>
          <td style="padding: 10px 0; color: #1D231A; font-size: 15px;">
            <a href="mailto:${escapeHtml(cleanEmail)}" style="color: #4E5E43; font-weight: 600; text-decoration: underline;">
              ${escapeHtml(cleanEmail)}
            </a>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; font-weight: 700; color: #4E5E43; font-size: 14px; text-transform: uppercase;">
            Date / Time:
          </td>
          <td style="padding: 10px 0; color: #6E7B67; font-size: 13px;">
            ${submissionDate} (UTC)
          </td>
        </tr>
      </table>

      <!-- Project Details Box -->
      <div style="margin-top: 16px;">
        <div style="font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #4E5E43; margin-bottom: 8px;">
          Project Details:
        </div>
        <div style="background: #FAF8F4; border: 1px solid rgba(78, 94, 67, 0.15); border-radius: 10px; padding: 18px; color: #2A3524; font-size: 14px; line-height: 1.65; white-space: pre-wrap;">
${escapeHtml(cleanDetails)}
        </div>
      </div>

      <!-- Action Reply Button -->
      <div style="margin-top: 28px; text-align: center;">
        <a href="mailto:${escapeHtml(cleanEmail)}?subject=${encodeURIComponent('Re: Project Inquiry — LIBRA TECHLAB')}" 
           style="display: inline-block; background: #4E5E43; color: #FAF8F4; text-decoration: none; padding: 12px 24px; border-radius: 9999px; font-weight: 700; font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase;">
          Reply to ${escapeHtml(cleanName)} →
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background: #EFECE3; padding: 18px 32px; text-align: center; font-size: 12px; color: #6E7B67; border-top: 1px solid rgba(78, 94, 67, 0.1);">
      Sent securely via <strong>LIBRA TECHLAB</strong> website contact system.
    </div>
  </div>
</body>
</html>
`;

    const emailText = `
New Project Inquiry — LIBRA TECHLAB

Name: ${cleanName}
Email: ${cleanEmail}
Date: ${submissionDate}

Project Details:
${cleanDetails}

---
You can reply directly to this email to contact ${cleanName} (${cleanEmail}).
`;

    const sendResult = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: cleanEmail,
      subject: emailSubject,
      html: emailHtml,
      text: emailText,
    });

    if (sendResult.error) {
      console.error('[LIBRA TECHLAB Contact API] Resend API error:', sendResult.error);
      return res.status(502).json({
        success: false,
        error: `Email sending failed: ${sendResult.error.message || 'Unknown provider error'}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Thanks! Your project inquiry has been sent successfully.',
      id: sendResult.data?.id,
    });
  } catch (error: any) {
    console.error('[LIBRA TECHLAB Contact API] Internal Server Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Something went wrong while processing your request. Please try again.',
    });
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
