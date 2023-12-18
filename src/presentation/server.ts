import { CheckService } from '../domain/use-cases/checks/check-service';
import { CronService } from './cron/cronService';

export class ServerApp {
	public static start() {
		console.log('Server started');
		CronService.createJob('*/10 * * * * *', () => {
            new CheckService(
                () => console.log('Service is ok'),
                () => console.log('Service is not ok'),
            ).execute('https://www.google.com');
		});
	}
}
