import { IsNotEmpty, IsString } from 'class-validator';

export class PokemonName {
  @IsNotEmpty()
  @IsString()
  name: string;
}
