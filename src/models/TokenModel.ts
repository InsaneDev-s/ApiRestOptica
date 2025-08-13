import mongoose, { Schema, Document } from "mongoose";

interface IToken extends Document {
  name: string;
  value: string;
}

const TokenSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  value: { type: String, required: true },
});

export default mongoose.model<IToken>("Token", TokenSchema);
