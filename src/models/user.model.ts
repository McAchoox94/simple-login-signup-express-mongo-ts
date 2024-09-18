import mongoose, { Schema, Document } from 'mongoose';

// Interface pour le modèle User
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

// Définir le schéma User
const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Exporter le modèle
export default mongoose.model<IUser>('User', UserSchema);
