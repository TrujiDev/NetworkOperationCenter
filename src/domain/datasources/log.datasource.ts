import { LogEntity, LogSeverityLevel } from '../entities/log.entity';

export abstract class LogDatasource {
	abstract saveLog(log: LogEntity): Promise<void>;
	abstract getLogs(securityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}
