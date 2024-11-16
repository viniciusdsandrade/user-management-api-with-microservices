// src/models/User.ts

import { Schema, model, Document, Types } from 'mongoose';
import { IUser } from '../interfaces/IUser';

export interface IUserDocument extends IUser, Document {
    _id: Types.ObjectId;
}

const UserSchema = new Schema<IUserDocument>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false }, // Exclui a senha por padrão nas consultas
}, {
    timestamps: true,
});

// Criação do Modelo
const User = model<IUserDocument>('User', UserSchema);

export default User;
