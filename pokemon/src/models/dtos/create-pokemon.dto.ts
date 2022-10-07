import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePokemonDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  element: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;
}
