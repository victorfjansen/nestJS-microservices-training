import {
  Body,
  Controller,
  Logger,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreatePokemonDto } from 'src/models';
import { PokemonService } from 'src/services/pokemon.service';

@Controller()
export class PokemonController {
  logger: Logger;
  constructor(private readonly pokemonService: PokemonService) {
    this.logger = new Logger('Microservice');
  }

  @MessagePattern('criar-pokemon')
  @UsePipes(ValidationPipe)
  async createPokemon(
    @Body() createPokemon: CreatePokemonDto,
  ): Promise<CreatePokemonDto> {
    this.logger.log(createPokemon);
    return await this.pokemonService.createPokemon(createPokemon);
  }
}
