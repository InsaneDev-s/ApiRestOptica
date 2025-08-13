import mongoose, { Schema, Document } from "mongoose";

interface IToken extends Document {
  name: string;
  value: string;
}

const TokenSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  value: { type: String, required: true },
});

const TokenModel = mongoose.model<IToken>("Token", TokenSchema);
export default TokenModel;
