import { CheckService } from '../domain/use-cases/checks/check-service';
import { CronService } from './cron/cronService';

export class ServerApp {
	public static start() {
		console.log('Server started');
		CronService.createJob('*/10 * * * * *', () => {
            // new CheckService().execute('http://localhost:3000');
            new CheckService().execute('https://www.google.com');
		});
	}
}
