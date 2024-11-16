// src/routes/userRoutes.ts

import express from 'express';
import { createUser } from '../controllers/userController';
import { body } from 'express-validator';
import { validate } from '../middlewares/validate';

const router = express.Router();

/**
 * POST /users
 * Cria um novo usuário.
 */
router.post(
    '/',
    [
        body('username')
            .trim()
            .notEmpty()
            .withMessage('O nome de usuário é obrigatório.')
            .isLength({ min: 3 })
            .withMessage('O nome de usuário deve ter pelo menos 3 caracteres.'),
        body('password')
            .notEmpty()
            .withMessage('A senha é obrigatória.')
            .isLength({ min: 8 })
            .withMessage('A senha deve ter pelo menos 8 caracteres.')
            .matches(/[a-z]/)
            .withMessage('A senha deve conter pelo menos uma letra minúscula.')
            .matches(/[A-Z]/)
            .withMessage('A senha deve conter pelo menos uma letra maiúscula.')
            .matches(/\d/)
            .withMessage('A senha deve conter pelo menos um número.')
            .matches(/[\W_]/)
            .withMessage('A senha deve conter pelo menos um símbolo.'),
    ],
    validate,
    createUser
);

export default router;
