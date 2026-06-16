"use server";

import { Resend } from 'resend';
import { portfolioData } from '@/data/portfolio';
import { escapeHTML } from '@/utils/escape';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_to_prevent_crash');

// Use a verified domain email here if you have one, e.g., 'hello@yourdomain.com'
// For testing without a verified domain, Resend only allows sending to your own email using 'onboarding@resend.dev'
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
const MY_EMAIL = portfolioData.personal.email;

export async function submitContactForm(formData: { name: string; email: string; message: string }) {
    // SECURITY: Ensure input types are strictly strings to prevent TypeErrors from malicious payloads
    if (typeof formData.name !== 'string' || typeof formData.email !== 'string' || typeof formData.message !== 'string') {
        return { success: false, error: 'Invalid input format.' };
    }

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name || !email || !message) {
        return { success: false, error: 'All fields are required.' };
    }

    // SECURITY: Enforce reasonable length limits to prevent Denial of Service (DoS) via resource exhaustion
    if (name.length < 2 || name.length > 100) {
        return { success: false, error: 'Name must be between 2 and 100 characters.' };
    }

    if (email.length > 255 || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        return { success: false, error: 'Please enter a valid email address.' };
    }

    if (message.length < 10 || message.length > 5000) {
        return { success: false, error: 'Message must be between 10 and 5000 characters.' };
    }

    const safeName = escapeHTML(name);
    const safeEmail = escapeHTML(email);
    const safeMessage = escapeHTML(message);

    try {
        // 1. Send notification to YOU (the portfolio owner)
        await resend.emails.send({
            from: FROM_EMAIL,
            to: MY_EMAIL,
            subject: `New Portfolio Message from ${name}`,
            replyTo: email,
            html: `
                <h3>New Message from Portfolio Contact Form</h3>
                <p><strong>Name:</strong> ${safeName}</p>
                <p><strong>Email:</strong> ${safeEmail}</p>
                <p><strong>Message:</strong></p>
                <p>${safeMessage.replace(/\n/g, '<br>')}</p>
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
                    <h3>Hi ${safeName},</h3>
                    <p>Thank you for reaching out! I've received your message and will get back to you as soon as possible.</p>
                    <p>Here is a copy of your message for your records:</p>
                    <blockquote style="border-left: 4px solid #ccc; padding-left: 16px; color: #555;">
                        ${safeMessage.replace(/\n/g, '<br>')}
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
