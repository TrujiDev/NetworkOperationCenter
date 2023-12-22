import fs from 'fs';
import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

export class FileSystemDatasource implements LogDatasource {
	private readonly logPath = 'logs/';
	private readonly allLogsPath = 'logs/all-logs.log';
	private readonly lowLogsPath = 'logs/logs-low.log';
	private readonly mediumLogsPath = 'logs/logs-medium.log';
	private readonly highLogsPath = 'logs/logs-high.log';

	constructor() {
		this.createLogsFile();
	}

	private createLogsFile = () => {
		if (!fs.existsSync(this.logPath)) {
			fs.mkdirSync(this.logPath);
		}

		[this.lowLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(path => {
			if (fs.existsSync(path)) return;
			fs.writeFileSync(path, '');
		});
	};

	async saveLog(log: LogEntity): Promise<void> {
		const logAsJson = `${JSON.stringify(log)}\n`;

		fs.appendFileSync(this.allLogsPath, logAsJson);

		switch (log.level) {
			case LogSeverityLevel.low:
				fs.appendFileSync(this.lowLogsPath, logAsJson);
				break;
			case LogSeverityLevel.medium:
				fs.appendFileSync(this.mediumLogsPath, logAsJson);
				break;
			case LogSeverityLevel.high:
				fs.appendFileSync(this.highLogsPath, logAsJson);
				break;
			default:
				break;
		}
	}

	private getLogsFromFile = async (path: string): Promise<LogEntity[]> => {
		const logs = fs.readFileSync(path, 'utf8');
		if (!logs) return [];
		return logs
			.split('\n')
			.filter((log: string) => log !== '')
			.map((log: string) => LogEntity.fromJson(log));
	};

	async getLogs(securityLevel: LogSeverityLevel): Promise<LogEntity[]> {
		switch (securityLevel) {
			case LogSeverityLevel.low:
				return this.getLogsFromFile(this.lowLogsPath);
			case LogSeverityLevel.medium:
				return this.getLogsFromFile(this.mediumLogsPath);
			case LogSeverityLevel.high:
				return this.getLogsFromFile(this.highLogsPath);
			default:
				return this.getLogsFromFile(this.allLogsPath);
		}
	}
}
