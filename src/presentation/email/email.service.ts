import nodemailer from 'nodemailer';
import { ENVS } from '../../config/plugins/env.plugin';

interface sendEmailOptions { 
    to: string;
    subject: string;
    htmlBody: string;
    // attachments
}

export class EmailService {
    private transporter = nodemailer.createTransport({
        service: ENVS.MAILER_SERVICE,
        auth: {
            user: ENVS.MAILER_EMAIL,
            pass: ENVS.MAILER_SECRET_KEY,
        }
    });

    async sendEmail(options: sendEmailOptions): Promise<boolean> {
        const { to, subject, htmlBody } = options;
        
        try {
            const sentInformation = await this.transporter.sendMail({
                from: ENVS.MAILER_EMAIL,
                to,
                subject,
                html: htmlBody,
            });

            console.log(sentInformation);

            return true
        } catch (error) {
            return false
        }
    }
}
