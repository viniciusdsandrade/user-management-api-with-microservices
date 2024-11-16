// src/services/userService.ts

import User, {IUserDocument} from '../models/User';
import {IUserCreateRequest} from '../interfaces/IUserCreateRequest';
import bcrypt from 'bcrypt';

export class UserService {
    private static SALT_ROUNDS = 10;

    public async createUser(userData: IUserCreateRequest): Promise<IUserDocument> {
        const {username, password} = userData;

        // Verificar se o username já existe
        const existingUser = await User.findOne({username}).exec();
        if (existingUser) {
            throw new Error('Nome de usuário já existe.');
        }

        // Validar complexidade da senha
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!passwordRegex.test(password)) {
            throw new Error('Senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos.');
        }

        // Criptografar a senha
        const hashedPassword = await bcrypt.hash(password, UserService.SALT_ROUNDS);

        // Criar o usuário
        const user = new User({
            username,
            password: hashedPassword,
        });

        await user.save();

        return user;
    }
}

export default new UserService();
