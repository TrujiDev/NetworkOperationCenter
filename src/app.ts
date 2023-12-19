import { ServerApp } from './presentation/server';
// import { ENVS } from './config/plugins/env.plugin';

(() => {
	main();
})();

function main() {
	ServerApp.start();
}
