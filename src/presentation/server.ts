import { CheckService } from '../domain/use-cases/checks/check-service';
import { CronService } from './cron/cronService';

export class ServerApp {
	public static start() {
		console.log('Server started');
		CronService.createJob('*/10 * * * * *', () => {
            // new CheckService().execute('http://localhost:3000');
            const url = 'https://www.google.com';
            new CheckService(
                () => console.log(`Check service ${url} is ok`),
                () => console.log('There was an error'),
            ).execute(url);
		});
	}
}
