import mongoose from 'mongoose';

interface ConnectionOptions {
	mongoURL: string;
	dbName: string;
}

export class MongoDB {
	static async connect(options: ConnectionOptions) {
		const { mongoURL, dbName } = options;

		try {
			await mongoose.connect(mongoURL, {
				dbName,
            });
            
            console.log('Connected to MongoDB');
		} catch (error) {
			console.log('Error connecting to MongoDB');
			throw error;
		}
	}
}
