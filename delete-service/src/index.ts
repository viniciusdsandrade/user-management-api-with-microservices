// delete-service/src/index.ts

import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './middlewares/errorHandler';
import { Logger } from './utils/logger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());

// Conectando ao MongoDB
mongoose.connect(process.env.MONGODB_URI as string)
    .then(() => Logger.info('MongoDB conectado com sucesso!'))
    .catch(err => {
        Logger.error('Erro ao conectar no MongoDB:', err);
        process.exit(1);
    });

// Rotas
app.use('/users', userRoutes);

// Middleware de Erro
app.use(errorHandler);

// Iniciando o servidor
app.listen(PORT, () => {
    Logger.info(`DELETE Service rodando na porta ${PORT}`);
});
