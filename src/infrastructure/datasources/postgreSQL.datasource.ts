import { PrismaClient, SeverityLevel } from '@prisma/client';
import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

const prisma = new PrismaClient();

const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH,
}

export class PostgreSQLDatasource implements LogDatasource {
	async saveLog(log: LogEntity): Promise<void> {
        const { level, message, origin } = log;

        const lvl = severityEnum[log.level];
        
        const newLog = await prisma.logModel.create({
            data: {
                level: lvl,
                message,
                origin,
            },
        });
    }
    
    async getLogs(securityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const level = severityEnum[securityLevel];

        const logs = await prisma.logModel.findMany({
            where: {
                level,
            },
        });

        return logs.map(dbLog => LogEntity.fromObject(dbLog))
	}
}
