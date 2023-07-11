import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';

const clientId = process.env.GMAIL_API_CLIENT_ID!;
const clientSecret = process.env.GMAIL_API_CLIENT_SECRET!;
const redirectUri = process.env.GMAIL_API_REDIRECT_URI!;
const refreshToken = process.env.GMAIL_API_REFRESH_TOKEN!;
const senderEmail = process.env.GMAIL_API_SENDER_EMAIL!;

const zohoUsername = process.env.ZOHO_USERNAME!;
const zohoPassword = process.env.ZOHO_PASSWORD!;

const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

oAuth2Client.setCredentials({ refresh_token: refreshToken });

const accessToken = (await oAuth2Client.getAccessToken()) as string;

const gmailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: senderEmail,
        clientId,
        clientSecret,
        refreshToken,
        accessToken,
    },
});

const zohoTransporter = nodemailer.createTransport({
    host: 'smtp.zoho.eu',
    port: 465,
    secure: true,
    auth: {
      user: zohoUsername,
      pass: zohoPassword
    }
  });

type SendEmailParams = {
    to: string;
    subject: string;
    html: string;
};

export const sendEmail = async ({ to, subject, html }: SendEmailParams) =>
    await gmailTransporter.sendMail({
        from: '"My SmartBook" <no-replay@my-smartbook.com>',
        to,
        subject,
        html,
    });
