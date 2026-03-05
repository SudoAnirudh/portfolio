"use server";

import { Resend } from 'resend';
import { portfolioData } from '@/data/portfolio';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_to_prevent_crash');

// Use a verified domain email here if you have one, e.g., 'hello@yourdomain.com'
// For testing without a verified domain, Resend only allows sending to your own email using 'onboarding@resend.dev'
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
const MY_EMAIL = portfolioData.personal.email;

export async function submitContactForm(formData: { name: string; email: string; message: string }) {
    const { name, email, message } = formData;

    if (!name || !email || !message) {
        return { success: false, error: 'All fields are required.' };
    }

    try {
        // 1. Send notification to YOU (the portfolio owner)
        await resend.emails.send({
            from: FROM_EMAIL,
            to: MY_EMAIL,
            subject: `New Portfolio Message from ${name}`,
            replyTo: email,
            html: `
                <h3>New Message from Portfolio Contact Form</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `,
        });

        // 2. Send auto-reply to the SENDER (the person who filled out the form)
        // Note: This requires a verified domain in Resend. If you only have the free tier
        // without a verified domain, this might fail unless the sender happens to be your verified email.
        await resend.emails.send({
            from: FROM_EMAIL,
            to: email, // Send to the person who submitted
            subject: `Thanks for reaching out, ${name}!`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                    <h3>Hi ${name},</h3>
                    <p>Thank you for reaching out! I've received your message and will get back to you as soon as possible.</p>
                    <p>Here is a copy of your message for your records:</p>
                    <blockquote style="border-left: 4px solid #ccc; padding-left: 16px; color: #555;">
                        ${message.replace(/\n/g, '<br>')}
                    </blockquote>
                    <br/>
                    <p>Best regards,</p>
                    <p><strong>${portfolioData.personal.name}</strong><br/>
                    ${portfolioData.personal.role}</p>
                </div>
            `,
        });

        return { success: true };
    } catch (error) {
        console.error('Resend Error:', error);
        return { success: false, error: 'Failed to send message. Please try again later.' };
    }
}
