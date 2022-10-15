import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdatePokemonDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  age: number;

  @IsString()
  element: string;
}
