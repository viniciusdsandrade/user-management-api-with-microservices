// delete-service/src/models/User.ts

import {Schema, model, Document, Query} from 'mongoose';
import {hashPassword, comparePassword} from '../services/userService';

// Interface do Documento do Usuário
export interface IUser extends Document {
    username: string;
    password: string;

    comparePassword(candidatePassword: string): Promise<boolean>;
}

// Definição do Schema do Usuário
const UserSchema = new Schema<IUser>({
    username: {type: String, required: true},
    password: {type: String, required: true, select: false}, // Exclui a senha por padrão nas consultas
});

// Middleware para hash da senha antes de salvar
UserSchema.pre<IUser>('save', async function () {
    if (!this.isModified('password')) {
        return;
    }
    this.password = await hashPassword(this.password);
});

// Middleware para hash da senha antes de atualizar
UserSchema.pre('findOneAndUpdate', async function (this: Query<IUser, IUser>) {
    const update = this.getUpdate();

    if (update && typeof update === 'object') {
        if ('password' in update && update.password) {
            update.password = await hashPassword(update.password);
            this.setUpdate(update);
        }
    }
});

// Método para comparar senhas
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return comparePassword(candidatePassword, this.password);
};

// Criação do Modelo
const User = model<IUser>('User', UserSchema);

export default User;
