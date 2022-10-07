import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePokemonDto, Pokemon } from 'src/models';
import { BadRequestException } from 'src/shared';

@Injectable()
export class PokemonService {
  logger: Logger;
  constructor(
    @InjectModel('Pokemon') private readonly pokemonModel: Model<Pokemon>,
  ) {
    this.logger = new Logger();
  }

  private async findPokemon(name: string) {
    return await this.pokemonModel.findOne({ name });
  }

  async createPokemon(
    createPokemon: CreatePokemonDto,
  ): Promise<CreatePokemonDto> {
    const { name } = createPokemon;
    const foundPokemon = await this.findPokemon(name);

    foundPokemon && BadRequestException('Ops! Esse pokemon já existe!');
    return await this.pokemonModel.create(createPokemon);
  }
}
