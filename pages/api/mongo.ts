import mongoose, { connect } from 'mongoose';
import { connectToDatabase } from '../../src/config/connectToDatabase';

export default async function (req, res) {
  if(mongoose.connection.readyState === 1) {
    const state = mongoose.connections.map(c => c.readyState);
    return res.json({ newConnectionCreated: false, state });
  }
  await connectToDatabase();
  const state = mongoose.connections.map(c => c.readyState);
  return res.json({ newConnectionCreated: true, state });
}