import { ENVS } from './env.plugin';

describe('envs.plugin.ts', () => {
	test('should return env options', () => {
		expect(ENVS).toEqual({
			PORT: 3000,
			MAILER_SERVICE: 'gmail',
			MAILER_EMAIL: '',
			MAILER_SECRET_KEY: '',
			PROD: false,
			MONGO_URL: '',
			MONGO_DB_NAME: '',
			MONGO_USER: '',
			MONGO_PASS: '',
		});
	});

	test('should return error if not found env', async () => {
		jest.resetModules();
		process.env.PORT = 'ABC';

		try {
			await import('./env.plugin');
			expect(true).toBe(false);
		} catch (error) {
			expect(`${error}`).toContain('"PORT" should be a valid integer');
		}
	});
});
