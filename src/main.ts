import {
    INestApplication,
    NestApplicationOptions,
    ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';

export async function createApp(
    options?: NestApplicationOptions,
): Promise<INestApplication> {
    const app = await NestFactory.create(AppModule, options);
    app.enableCors();
    app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            validationError: {
                target: false,
            },
        }),
    );
    // useContainer(app.select(AppModule), { fallbackOnErrors: true });
    return app;
}

async function main() {
    const app = await createApp();
    await app.listen(3000);
}

export let viteNodeApp;

if (process.env.NODE_ENV === 'production') {
    void main();
} else {
    viteNodeApp = createApp();
}
