import { ENVS } from './config/plugins/env.plugin';
import { MongoDB } from './data/mongo';
import { ServerApp } from './presentation/server';

(() => {
	main();
})();

async function main() {
	await MongoDB.connect({
		mongoURL: ENVS.MONGO_URL,
		dbName: ENVS.MONGO_DB_NAME,
	});
	ServerApp.start();
}
