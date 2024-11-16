// src/controllers/userController.ts

import {Request, Response, NextFunction} from 'express';
import UserService from '../services/userService';
import {Logger} from '../utils/logger';
import {ApiResponse} from '../interfaces/ApiResponse';
import {IUserCreateRequest} from '../interfaces/IUserCreateRequest';

export const createUser = async (
    req: Request<{}, {}, IUserCreateRequest>,
    res: Response<ApiResponse<{ _id: string; username: string }>>,
    next: NextFunction
): Promise<void> => {
    try {
        const {username, password} = req.body;

        const newUser = await UserService.createUser({username, password});

        res.status(201).json({
            data: {
                _id: newUser._id.toString(), // Converter Types.ObjectId para string
                username: newUser.username,
            },
            message: 'Usuário criado com sucesso.',
        });
    } catch (error: any) {
        if (error.code === 11000) { // Erro de duplicidade do MongoDB
            res.status(400).json({error: 'Nome de usuário já existe.'});
        } else if (error.message) {
            res.status(400).json({error: error.message});
        } else {
            Logger.error('Erro ao criar usuário:', error);
            next(error);
        }
    }
};
