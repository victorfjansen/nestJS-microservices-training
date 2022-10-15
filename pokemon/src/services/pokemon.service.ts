import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePokemonDto, Pokemon, UpdatePokemonDto } from 'src/models';
import { BadRequestException } from 'src/shared';

@Injectable()
export class PokemonService {
  logger: Logger;
  constructor(
    @InjectModel('Pokemon') private readonly pokemonModel: Model<Pokemon>,
  ) {
    this.logger = new Logger();
  }

  async findPokemon(name: string): Promise<CreatePokemonDto> {
    return await this.pokemonModel.findOne({ name });
  }

  private async updateAndReturnPokemon(
    pokemon: UpdatePokemonDto,
  ): Promise<Pokemon> {
    const { name } = pokemon;
    return this.pokemonModel.findOneAndUpdate({ name }, pokemon).exec();
  }

  async createPokemon(
    createPokemon: CreatePokemonDto,
  ): Promise<CreatePokemonDto> {
    const { name } = createPokemon;
    const foundPokemon = await this.findPokemon(name);

    foundPokemon && BadRequestException('Ops! Esse pokemon já existe!');
    return await this.pokemonModel.create(createPokemon);
  }

  async updatePokemon(pokemon: UpdatePokemonDto): Promise<Pokemon> {
    const foundPokemon = this.findPokemon(pokemon.name);
    !foundPokemon && BadRequestException('Ops, esse pokemon não existe');

    console.log(pokemon, foundPokemon);

    return this.updateAndReturnPokemon(pokemon);
  }

  async getAllPokemons(): Promise<Pokemon[]> {
    return await this.pokemonModel.find().exec();
  }
}
