import { Controller } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Controller()
export class AppController {
  private readonly serverAdminGateway: ClientProxy;
  constructor() {
    this.serverAdminGateway = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://user:VgO5mVJaHNEb@44.203.95.171:5672/pokemon'],
      },
    });
  }
}
