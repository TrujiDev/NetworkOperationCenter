import { PrismaClient } from '@prisma/client';
import { ENVS } from './config/plugins/env.plugin';
import { LogModel, MongoDB } from './data/mongo';
import { ServerApp } from './presentation/server';

(() => {
	main();
})();

async function main() {
	// await MongoDB.connect({
	// 	mongoURL: ENVS.MONGO_URL,
	// 	dbName: ENVS.MONGO_DB_NAME,
	// });

	// const newLog = await LogModel.create({
	// 	message: 'Test log message from app.ts',
	// 	origin: 'app.ts',
	// 	level: 'medium',
	// });
	// await newLog.save();
	// console.log(newLog);

	// const logs = await LogModel.find();
	// console.log(logs);

	ServerApp.start();
}
