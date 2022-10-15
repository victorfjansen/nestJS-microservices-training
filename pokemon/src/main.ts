import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Microservice');
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://user:VgO5mVJaHNEb@52.91.27.247:5672/smartranking'],
      queue: 'pokemon',
    },
  });
  await app.listen().then(() => logger.log('microservice is listening'));
}
bootstrap();
