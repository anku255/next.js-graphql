import mongoose, { connect } from 'mongoose';
import { connectToDatabase } from '../../src/config/connectToDatabase';

export default async function (req, res) {
  if(mongoose.connection.readyState === 1) {
    return res.json({ newConnectionCreated: false });
  }
  await connectToDatabase();
  return res.json({ newConnectionCreated: true });
}