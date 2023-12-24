import nodemailer from 'nodemailer';
import { ENVS } from '../../config/plugins/env.plugin';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogRepository } from '../../domain/repository/log.repository';

export interface SendEmailOptions {
	to: string | string[];
	subject: string;
	htmlBody: string;
	attachments?: Attachment[];
}

interface Attachment {
	filename: string;
	path: string;
}

export class EmailService {
	private transporter = nodemailer.createTransport({
		service: ENVS.MAILER_SERVICE,
		auth: {
			user: ENVS.MAILER_EMAIL,
			pass: ENVS.MAILER_SECRET_KEY,
		},
	});

	constructor() {}

	async sendEmail(options: SendEmailOptions): Promise<boolean> {
		const { to, subject, htmlBody, attachments = [] } = options;

		try {
			const sentInformation = await this.transporter.sendMail({
				from: ENVS.MAILER_EMAIL,
				to,
				subject,
				html: htmlBody,
				attachments,
			});

			return true;
		} catch (error) {
			return false;
		}
	}

	async sendEmailWithFileSystemLogs(to: string | string[]) {
		const subject = 'Logs de sistema - NOC';
		const htmlBody = `
            <h1>Logs de sistema - NOC</h1>
            <p>Registro de todos los logs generados por el sistema</p>
            <p>Fecha: ${new Date().toLocaleString()}</p>
        `;
		const attachments: Attachment[] = [
			{
				filename: 'all-logs.log',
				path: './logs/all-logs.log',
			},
			{
				filename: 'logs-low.log',
				path: './logs/logs-low.log',
			},
			{
				filename: 'logs-medium.log',
				path: './logs/logs-medium.log',
			},
			{
				filename: 'logs-high.log',
				path: './logs/logs-high.log',
			},
		];

		return this.sendEmail({ to, subject, htmlBody, attachments });
	}
}
