// get-service/src/controllers/userController.ts

import {Request, Response, NextFunction} from 'express';
import UserService from '../services/userService';
import {Logger} from '../utils/logger';
import {ApiResponse} from '../interfaces/ApiResponse';
import {IUserResponse} from '../interfaces/IUserResponse';

/**
 * Controller para obter um usuário.
 */
export const getUser = async (
    req: Request,
    res: Response<ApiResponse<IUserResponse | null>>,
    next: NextFunction
): Promise<void> => {
    try {
        const user = await UserService.getUserById(req.params.id);

        if (!user) {
            res.status(404).json({error: 'Usuário não encontrado.'});
        } else {
            res.json({data: user});
        }
    } catch (error) {
        Logger.error('Erro ao obter usuário:', error);
        next(error);
    }
};
