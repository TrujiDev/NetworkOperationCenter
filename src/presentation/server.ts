import { CheckService } from '../domain/use-cases/checks/check-service';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository-impl';
import { CronService } from './cron/cronService';

const fileSystemLogRepository = new LogRepositoryImpl(
	new FileSystemDatasource()
);

export class ServerApp {
	public static start() {
		console.log('Server started');
		CronService.createJob('*/10 * * * * *', () => {
			const url = 'http://localhost:3000/'
			new CheckService(
				fileSystemLogRepository,
				() => console.log('Service is ok'),
				() => console.log('Service is not ok')
			).execute(url);
		});
	}
}
