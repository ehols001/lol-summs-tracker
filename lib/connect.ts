import mongoose from 'mongoose';

declare global {
        var mongoose: any
}

const NEXT_PUBLIC_MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI!;

if(!NEXT_PUBLIC_MONGODB_URI) {
        throw new Error(
                'Please define a MONGODB_URI environment variable inside .env'
        )
}

let cached = global.mongoose;

if(!cached) {
        cached = global.mongoose = { conn: null, promise: null }
}

async function Connect() {
        if(cached.conn) {
                return cached.conn
        }
        if(!cached.promise) {
                const opts = {
                        bufferCommands: false,
                }

                cached.promise = mongoose.connect(NEXT_PUBLIC_MONGODB_URI, opts).then((mongoose) => {
                        return mongoose;
                });
        }

        try {
                cached.conn = await cached.promise;
        } catch(error) {
                cached.promise = null;
                throw error;
        }

        return cached.conn;
}

export default Connect;