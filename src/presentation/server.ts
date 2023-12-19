import { CheckService } from '../domain/use-cases/checks/check-service';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository-impl';
import { CronService } from './cron/cronService';
import { EmailService } from './email/email.service';

const emailService = new EmailService();

const fileSystemLogRepository = new LogRepositoryImpl(
	new FileSystemDatasource()
);

export class ServerApp {
	public static start() {
		console.log('Server started');

		new SendEmailLogs(emailService, fileSystemLogRepository).execute([
			'kutedokashi@gmail.com',
			'eetgrisales@gmail.com',
		]);

		// emailService.sendEmailWithFileSystemLogs([
		// 	'kutedokashi@gmail.com',
		// 	'eetgrisales@gmail.com',
		// ]);

		CronService.createJob('*/10 * * * * *', () => {
			const url = 'http://localhost:3000/';
			new CheckService(
				fileSystemLogRepository,
				() => console.log('Service is ok'),
				() => console.log('Service is not ok')
			).execute(url);
		});
	}
}
