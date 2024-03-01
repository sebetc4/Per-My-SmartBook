import mongoose, { ConnectOptions } from "mongoose";

const mongoUri = process.env.MONGODB_URI!

export const dbConnect = async () => {
    if(mongoose.connection.readyState >= 1) {
        return
    }
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(mongoUri, {
            autoIndex: true,
        } as ConnectOptions);
        console.log('MongoDB connected')
    } catch(err) {
        console.log('Error MongoDB connection' + err)
    }
    mongoose.connect
}
