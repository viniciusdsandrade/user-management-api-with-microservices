// get-service/src/services/userService.ts

import User, { IUserDocument } from '../models/User';
import { IUserResponse } from '../interfaces/IUserResponse';

/**
 * Serviço para operações relacionadas a usuários.
 */
export class UserService {
    /**
     * Obtém um usuário pelo ID.
     * @param id - O ID do usuário.
     * @returns O usuário encontrado ou null se não existir.
     */
    public async getUserById(id: string): Promise<IUserResponse | null> {
        const user = await User.findById(id).select('-password').exec();
        if (user) {
            // Mapear para IUserResponse
            const { _id, username } = user;
            return { _id, username };
        }
        return null;
    }

    // Futuras funções relacionadas a usuários podem ser adicionadas aqui,
    // como listar todos os usuários, buscar por critérios específicos, etc.
}

export default new UserService();
