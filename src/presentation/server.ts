import { LogSeverityLevel } from '../domain/entities/log.entity';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service-multiple';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { MongoDatasource } from '../infrastructure/datasources/mongo.datasource';
import { PostgreSQLDatasource } from '../infrastructure/datasources/postgreSQL.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository-impl';
import { CronService } from './cron/cronService';
import { EmailService } from './email/email.service';

const emailService = new EmailService();

// const logReposiory = new LogRepositoryImpl(
// new FileSystemDatasource(),
// new MongoDatasource(),
// new PostgreSQLDatasource()
// );

const fileSystemLogRepository = new LogRepositoryImpl(
	new FileSystemDatasource()
);
const postgreSQLLogRepository = new LogRepositoryImpl(
	new PostgreSQLDatasource()
);
const mongoLogRepository = new LogRepositoryImpl(new MongoDatasource());

export class ServerApp {
	public static async start() {
		console.log('Server started');

		// new SendEmailLogs(emailService, fileSystemLogRepository).execute([]);

		// const logs = await logReposiory.getLogs(LogSeverityLevel.low);
		// console.log('logs', logs);

		// CronService.createJob('*/10 * * * * *', () => {
		// 	const url = 'http://google.com';
		// 	new CheckService(
		// 		logReposiory,
		// 		() => console.log('Service is ok'),
		// 		() => console.log('Service is not ok')
		// 	).execute(url);
		// });

		CronService.createJob('*/10 * * * * *', () => {
			const url = 'http://google.com';
			new CheckServiceMultiple(
				[fileSystemLogRepository, mongoLogRepository, postgreSQLLogRepository],
				() => console.log('Service is ok'),
				() => console.log('Service is not ok')
			).execute(url);
		});
	}
}
