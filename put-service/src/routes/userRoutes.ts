// src/routes/userRoutes.ts

import express from 'express';
import { updateUser } from '../controllers/userController';
import { body, param } from 'express-validator';
import { validate } from '../middlewares/validate';

const router = express.Router();

/**
 * PUT /users/:id
 * Atualiza um usuário existente.
 */
router.put(
    '/:id',
    [
        param('id')
            .isMongoId()
            .withMessage('ID inválido do usuário.'),
        body('username')
            .optional()
            .trim()
            .notEmpty()
            .withMessage('O nome de usuário não pode ser vazio.')
            .isLength({ min: 3 })
            .withMessage('O nome de usuário deve ter pelo menos 3 caracteres.'),
        body('password')
            .optional()
            .notEmpty()
            .withMessage('A senha não pode ser vazia.')
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
    updateUser
);

export default router;
