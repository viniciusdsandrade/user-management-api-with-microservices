// delete-service/src/routes/userController.ts

import express from 'express';
import { deleteUser } from '../controllers/userController';

const router = express.Router();

/**
 * DELETE /users/:id
 * Deleta um usuário pelo ID.
 */
router.delete('/:id', deleteUser);

export default router;
