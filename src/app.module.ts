import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { format, transports } from 'winston';
import { WinstonModule } from 'nest-winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/User/User.module';
@Module({
    imports: [
        SequelizeModule.forRoot({
            dialect: 'mysql',
            host: '127.0.0.1',
            port: 3306,
            username: 'root',
            password: 'huangfu@1993',
            database: 'test',
            autoLoadModels: true,
            // synchronize: true,
            logging: true,
            define: {
                // 禁用全局 timestamps
                timestamps: false,
            },
        }),
        WinstonModule.forRoot({
            exitOnError: false,
            format: format.combine(
                format.colorize(),
                format.timestamp({
                    format: 'YYYY/MM/DD HH:mm:ss',
                }),
                format.label({
                    label: 'services',
                }),
                format.splat(),
                format.printf(info => {
                    return `${info.timestamp} ${info.level}: [${info.label}]${info.message}`;
                }),
            ),
            transports: [
                new transports.Console({
                    level: 'info',
                }),
                new DailyRotateFile({
                    filename: `logs/%DATE%.log`,
                    datePattern: 'YYYY-MM-DD-HH',
                    zippedArchive: true,
                    maxSize: '20m',
                    maxFiles: '14d',
                }),
            ],
        }),
        UserModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
