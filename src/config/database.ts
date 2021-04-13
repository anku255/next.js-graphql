import mongoose from 'mongoose';

class Connection {
  constructor() {
    const url = process.env.DATABASE;

    if(process.env.NODE_ENV === 'local') {
      console.log('Establish new connection with url', url);
    }

    mongoose.Promise = global.Promise;
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);
    mongoose.connect(url);
  }
}

// @ts-expect-error
global.mongooseConnection = global.mongooseConnection || new Connection();

// @ts-expect-error
export default global.mongooseConnection;