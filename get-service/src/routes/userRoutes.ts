// get-service/src/routes/userController.ts

import express from 'express';
import { getUser } from '../controllers/userController';
import { param } from 'express-validator';
import { validate } from '../middlewares/validate';

const router = express.Router();

/**
 * GET /users/:id
 * Obtém um usuário pelo ID.
 */
router.get(
    '/:id',
    [
        param('id')
            .isMongoId()
            .withMessage('ID inválido do usuário.'),
    ],
    validate,
    getUser
);

export default router;
