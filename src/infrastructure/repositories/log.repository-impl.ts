import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";

export class LogRepositoryImpl implements LogRepository {
    private readonly logDatasource: LogDatasource;

    constructor(logDatasource: LogDatasource) {
        this.logDatasource = logDatasource;
    }
    
    async saveLog(log: LogEntity): Promise<void> {
        return this.logDatasource.saveLog(log);
    }

    async getLogs(securityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDatasource.getLogs(securityLevel);
    }
}