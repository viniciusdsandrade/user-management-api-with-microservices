// get-service/src/models/User.ts

import {Schema, model} from 'mongoose';
import {IUser} from '../interfaces/IUser';

const UserSchema = new Schema<IUser>({
    username: {type: String, required: true},
    password: {type: String, required: true, select: false}, // Exclui a senha por padrão nas consultas
});

// Criação do Modelo
const User = model<IUser>('User', UserSchema);

export default User;