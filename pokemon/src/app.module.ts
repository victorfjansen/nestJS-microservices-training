import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonController } from './controllers';
import { PokemonSchema } from './models';
import { PokemonService } from './services/pokemon.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin123:admin123@cluster0.wyyp0kf.mongodb.net/?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([{ name: 'Pokemon', schema: PokemonSchema }]),
  ],
  controllers: [PokemonController],
  providers: [PokemonService],
})
export class AppModule {}
