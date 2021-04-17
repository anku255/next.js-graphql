import mongoose from "mongoose";
mongoose.Promise = global.Promise;

let isConnected = false;

export const connectToDatabase = async () => {
  if (isConnected) {
    return Promise.resolve();
  }

  const db = await mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
  });
  
  isConnected = db.connections[0].readyState === 1;
};
