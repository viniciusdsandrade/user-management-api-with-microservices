// src/middlewares/errorHandler.ts

import { Request, Response, NextFunction } from 'express';
import { Logger } from '../utils/logger';
import { ApiResponse } from '../interfaces/ApiResponse';

/**
 * Middleware para tratamento centralizado de erros.
 */
export const errorHandler = (
    err: any,
    req: Request,
    res: Response<ApiResponse<null>>,
    next: NextFunction
): void => {
    Logger.error(err);

    if (res.headersSent) {
        return next(err);
    }

    res.status(500).json({ error: 'Ocorreu um erro interno no servidor.' });
};
