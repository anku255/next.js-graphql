import { schemaComposer } from "graphql-compose";
import { composeWithMongoose, ComposeWithMongooseOpts } from "graphql-compose-mongoose";
import { Model, Document } from 'mongoose';

export function createObjectTC({ model, customizationOptions = {} }: {model: Model<Document, {}>, customizationOptions?: ComposeWithMongooseOpts<{}>}) {
  let ModelTC = null;
 
  try {
   ModelTC = schemaComposer.getOTC(model.modelName);
  } catch {
   ModelTC = composeWithMongoose(model, customizationOptions);
  }
 
  return ModelTC;
 }