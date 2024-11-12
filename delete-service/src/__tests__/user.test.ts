// delete-service/src/__tests__/user.test.ts

import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from '../routes/userRoutes';
import {errorHandler} from '../middlewares/errorHandler';
import User from '../models/User';

const app = express();
app.use(express.json());
app.use('/users', userRoutes);
app.use(errorHandler);

// describe('DELETE /users/:id', () => {
//     let server: any;
//     let userId: string;
//
//     beforeAll(async () => {
//         // Conectar ao banco de dados de teste
//         const mongoURI = 'mongodb://localhost:27017/delete-service-test';
//         await mongoose.connect(mongoURI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         // Iniciar o servidor
//         server = app.listen(4000);
//     });
//
//     afterAll(async () => {
//         // Fechar o servidor e desconectar do banco de dados
//         await mongoose.connection.db.dropDatabase();
//         await mongoose.connection.close();
//         server.close();
//     });
//
//     it('deve deletar um usuário existente', async () => {
//         // Criar um usuário para deletar
//         const user = new User({
//             username: 'testuser',
//             password: 'testpassword',
//         });
//         await user.save();
//         userId = user._id.toString();
//
//         const res = await request(app).delete(`/users/${userId}`);
//
//         expect(res.status).toBe(200);
//         expect(res.body).toEqual({message: 'Usuário deletado com sucesso'});
//
//         // Verificar se o usuário foi deletado
//         const deletedUser = await User.findById(userId);
//         expect(deletedUser).toBeNull();
//     });
//
//     it('deve retornar 404 se o usuário não existir', async () => {
//         const nonExistentId = new mongoose.Types.ObjectId().toString();
//         const res = await request(app).delete(`/users/${nonExistentId}`);
//
//         expect(res.status).toBe(404);
//         expect(res.body).toEqual({error: 'Usuário não encontrado'});
//     });
//
//     it('deve retornar 400 se o ID for inválido', async () => {
//         const invalidId = '12345';
//         const res = await request(app).delete(`/users/${invalidId}`);
//
//         expect(res.status).toBe(400);
//         expect(res.body.errors).toBeDefined();
//         expect(res.body.errors[0].msg).toBe('ID inválido do usuário.');
//     });
// });
