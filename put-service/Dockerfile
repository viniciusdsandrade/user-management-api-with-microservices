# put-service/Dockerfile
# Etapa 1: Usar a imagem oficial do Node.js com suporte ao TypeScript
FROM node:16

# Etapa 2: Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Etapa 3: Copiar os arquivos de dependências
COPY package.json package-lock.json ./

# Etapa 4: Instalar as dependências da aplicação
RUN npm install

# Etapa 5: Copiar o restante do código da aplicação
COPY . .

# Etapa 6: Compilar o código TypeScript para JavaScript
RUN npm run build

# Etapa 7: Expor a porta que o serviço irá utilizar
EXPOSE 3002

# Etapa 8: Definir a variável de ambiente para produção
ENV NODE_ENV=production

# Etapa 9: Comando para iniciar a aplicação
CMD ["node", "dist/index.js"]
