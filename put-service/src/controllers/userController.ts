// src/controllers/userController.ts

import { Request, Response, NextFunction } from 'express';
import UserService from '../services/userService';
import { Logger } from '../utils/logger';
import { ApiResponse } from '../interfaces/ApiResponse';
import { IUserUpdateRequest } from '../interfaces/IUserUpdateRequest';
import { IUserResponse } from '../interfaces/IUserResponse';

/**
 * Controller para atualizar um usuário.
 */
export const updateUser = async (
    req: Request<{ id: string }, {}, IUserUpdateRequest>,
    res: Response<ApiResponse<IUserResponse>>,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const userData = req.body;

        const updatedUser = await UserService.updateUser(id, userData);

        if (!updatedUser) {
            res.status(404).json({ error: 'Usuário não encontrado.' });
            return;
        }

        res.json({
            data: {
                _id: updatedUser._id.toString(),
                username: updatedUser.username,
            },
            message: 'Usuário atualizado com sucesso.',
        });
    } catch (error: any) {
        if (error.code === 11000) { // Erro de duplicidade do MongoDB
            res.status(400).json({ error: 'Nome de usuário já existe.' });
        } else if (error.message === 'ID inválido do usuário.') {
            res.status(400).json({ error: error.message });
        } else if (error.message) {
            res.status(400).json({ error: error.message });
        } else {
            Logger.error('Erro ao atualizar usuário:', error);
            next(error);
        }
    }
};
