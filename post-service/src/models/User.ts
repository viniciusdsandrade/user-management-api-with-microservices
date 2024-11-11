// models/User.ts

import {Schema, model, Document, Query} from 'mongoose';
import bcrypt from 'bcrypt';

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
UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err as any);
    }
});

// Middleware para hash da senha antes de atualizar
UserSchema.pre('findOneAndUpdate', async function (this: Query<IUser, IUser>) {
    const update = this.getUpdate();

    if (update && typeof update === 'object') {
        if ('password' in update && update.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(update.password, salt);
                this.setUpdate({...update, password: hashedPassword});
            } catch (err) {
                throw err;
            }
        }
    }
});

// Método para comparar senhas
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

// Criação do Modelo
const User = model<IUser>('User', UserSchema);

export default User;
