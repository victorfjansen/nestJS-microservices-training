import {
  Body,
  Controller,
  Logger,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreatePokemonDto, Pokemon, UpdatePokemonDto } from 'src/models';
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

  @MessagePattern('buscar-pokemon')
  @UsePipes(ValidationPipe)
  async getPokemon(@Body() name: string): Promise<CreatePokemonDto> {
    return await this.pokemonService.findPokemon(name);
  }

  @MessagePattern('atualizar-pokemon')
  @UsePipes(ValidationPipe)
  async updatePokemon(@Body() pokemon: UpdatePokemonDto): Promise<Pokemon> {
    console.log('aqui');
    return await this.pokemonService.updatePokemon(pokemon);
  }

  @MessagePattern('get-all')
  async getAllPokemon(): Promise<Pokemon[]> {
    return await this.pokemonService.getAllPokemons();
  }
}
