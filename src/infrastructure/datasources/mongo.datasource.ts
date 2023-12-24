import { LogModel } from '../../data/mongo';
import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

export class MongoDatasource implements LogDatasource {
	async saveLog(log: LogEntity): Promise<void> {
		const newLog = await LogModel.create(log);
		await newLog.save();
		console.log('newLog', newLog.id);
	}

	async getLogs(securityLevel: LogSeverityLevel): Promise<LogEntity[]> {
		const logs = await LogModel.find({
			level: securityLevel,
		});

		return logs.map(mongoLog => LogEntity.fromObject(mongoLog));
	}
}
