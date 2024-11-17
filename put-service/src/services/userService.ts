// src/services/userService.ts

import User, {IUserDocument} from '../models/User';
import {IUserUpdateRequest} from '../interfaces/IUserUpdateRequest';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import {IUser} from "../interfaces/IUser";

export class UserService {
    private static SALT_ROUNDS = 10;

    /**
     * Atualiza um usuário existente.
     * @param id - O ID do usuário a ser atualizado.
     * @param userData - Dados para atualizar o usuário.
     * @returns O usuário atualizado ou null se não existir.
     * @throws Erro se o username já existir ou se a senha não atender aos requisitos.
     */
    public async updateUser(id: string, userData: IUserUpdateRequest): Promise<IUserDocument | null> {
        // Verificar se o ID é válido
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('ID inválido do usuário.');
        }

        const updateData: Partial<IUser> = {};

        if (userData.username) {
            // Verificar se o novo username já existe em outro usuário
            const existingUser = await User.findOne({username: userData.username}).exec();
            if (existingUser && existingUser._id.toString() !== id) {
                throw new Error('Nome de usuário já existe.');
            }
            updateData.username = userData.username;
        }

        if (userData.password) {
            // Validar complexidade da senha
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
            if (!passwordRegex.test(userData.password)) {
                throw new Error('Senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos.');
            }

            // Criptografar a senha
            updateData.password = await bcrypt.hash(userData.password, UserService.SALT_ROUNDS);
        }

        // Atualizar o usuário
        return await User.findByIdAndUpdate(
            id,
            {$set: updateData},
            {new: true, runValidators: true, select: '-password'}
        ).exec();
    }
}

export default new UserService();
