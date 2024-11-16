// src/utils/logger.ts

import {createLogger, format, transports} from 'winston';

export const Logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.errors({stack: true}),
        format.splat(),
        format.json()
    ),
    defaultMeta: {service: 'post-service'},
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.simple()
            )
        }),
        // Adicione outros transports conforme necessário (e.g., arquivos, serviços de logging)
    ],
});
