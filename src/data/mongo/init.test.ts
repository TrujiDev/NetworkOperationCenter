import mongoose from 'mongoose';
import { MongoDB } from './init';

describe('init MongoDB', () => {
	afterAll(() => {
		mongoose.connection.close();
	});

	test('should connect to MongoDB', async () => {
		const connected = await MongoDB.connect({
			dbName: process.env.MONGO_DB_NAME!,
			mongoURL: process.env.MONGO_URL!,
		});

		expect(connected).toBe(true);
	});

	test('should throw an error', async () => {
		try {
			const connected = await MongoDB.connect({
				dbName: process.env.MONGO_DB_NAME!,
				mongoURL: '',
			});
			expect(true).toBe(false);
		} catch (error) {}
	});
});
