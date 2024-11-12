// delete-service/src/services/userService.ts

import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

/**
 * Gera um hash para a senha fornecida.
 * @param password - A senha a ser hashada.
 * @returns O hash da senha.
 */
export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return bcrypt.hash(password, salt);
};

/**
 * Compara uma senha fornecida com um hash armazenado.
 * @param password - A senha fornecida.
 * @param hash - O hash armazenado.
 * @returns Verdadeiro se a senha corresponder, falso caso contrário.
 */
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash);
};
