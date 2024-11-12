// delete-service/src/controllers/userController.ts

import {Request, Response, NextFunction} from 'express';
import User from '../models/User';
import {Logger} from '../utils/logger';

/**
 * Controller para deletar um usuário.
 */
export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).json({error: 'Usuário não encontrado'});
        } else {
            res.json({message: 'Usuário deletado com sucesso'});
        }
    } catch (error) {
        Logger.error('Erro ao deletar usuário:', error);
        next(error);
    }
};
