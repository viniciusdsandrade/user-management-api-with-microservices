import dotenv = require('dotenv');
import express = require('express');
import {Request, Response} from 'express';
import mongoose from 'mongoose';
import User from './models/User';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Conectando ao MongoDB sem opções depreciadas
mongoose.connect(process.env.MONGODB_URI as string)
    .then(() => console.log('MongoDB conectado com sucesso!'))
    .catch(err => {
        console.error('Erro ao conectar no MongoDB:', err);
        process.exit(1);
    });

// Rota para criar um novo usuário
app.post('/users', async (req: Request, res: Response): Promise<void> => {
    try {
        const {username, password} = req.body;
        const user = new User({username, password});
        await user.save();
        res.json(user);
    } catch (error) {
        res.status(500).json({error: 'Erro ao criar usuário'});
    }
});

// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`POST Service running on port ${PORT}`);
});