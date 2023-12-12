import { MongoClient } from 'mongodb';

if(!process.env.MONGODB_URI) {
    throw new Error('Invalid environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if(!process.env.MONGODB_URI) {
    throw new Error('Please add your Mongo URI to .env');
}

if(process.env.NODE_ENV === 'development') {
    // In development, use global client variable
    let globalMongo = global as typeof globalThis & {
        _mongoClientPromise: Promise<MongoClient>;
    }

    if(!globalMongo._mongoClientPromise) {
        client = new MongoClient(uri, options);
        globalMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalMongo._mongoClientPromise;
} else {
    // In production, use exported client variable
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default clientPromise;