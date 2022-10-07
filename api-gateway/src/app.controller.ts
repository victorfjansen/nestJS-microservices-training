import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { CreatePokemonDto } from './models';

@Controller('api/v1/pokemon')
export class AppController {
  private readonly serverAdminGateway: ClientProxy;
  constructor() {
    this.serverAdminGateway = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://user:VgO5mVJaHNEb@44.203.95.171:5672/smartranking'],
        queue: 'pokemon',
      },
    });
  }

  @Post('criar-pokemon')
  @UsePipes(ValidationPipe)
  criarPokemon(@Body() criarPokemon: CreatePokemonDto) {
    return this.serverAdminGateway.send('criar-pokemon', criarPokemon);
  }
}
