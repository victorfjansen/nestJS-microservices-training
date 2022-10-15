import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

import {axios} from `axios`

import { CreatePokemonDto, UpdatePokemonDto } from './models';
import { Pokemon } from './models/interface';

@Controller('api/v1/pokemon')
export class AppController {
  private readonly serverAdminGateway: ClientProxy;
  constructor() {
    this.serverAdminGateway = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://user:VgO5mVJaHNEb@52.91.27.247:5672/smartranking'],
        queue: 'pokemon',
      },
    });
  }

  @Get()
  async getAllPokemons() {
    return this.serverAdminGateway.send('get-all', 'all');
  }

  @Get('buscar-pokemon/:name')
  async buscarPokemon(@Param('name') name: string) {
    return this.serverAdminGateway.send('buscar-pokemon', name);
  }

  @Post('criar-pokemon')
  @UsePipes(ValidationPipe)
  criarPokemon(@Body() criarPokemon: CreatePokemonDto) {
    return this.serverAdminGateway.send('criar-pokemon', criarPokemon);
  }

  @Put('atualizar-pokemon')
  async updatePokemon(@Body() pokemon: UpdatePokemonDto) {
    axios
    return this.serverAdminGateway.send('atualizar-pokemon', pokemon);
  }
}
