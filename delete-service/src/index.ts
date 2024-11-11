// delete-service/src/index.ts

import dotenv from 'dotenv';
import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import User from './models/User';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());

// Conectando ao MongoDB
mongoose.connect(process.env.MONGODB_URI as string)
    .then(() => console.log('MongoDB conectado com sucesso!'))
    .catch(err => {
        console.error('Erro ao conectar no MongoDB:', err);
        process.exit(1);
    });

// Rota para deletar um usuário
app.delete('/users/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).json({error: 'Usuário não encontrado'});
        } else {
            res.json({message: 'Usuário deletado com sucesso'});
        }
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        res.status(500).json({error: 'Erro ao deletar usuário'});
    }
});

// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`DELETE Service rodando na porta ${PORT}`);
});
