import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiModule } from './api/api.module';
import { AuthModule } from './auth/auth.module';
import { ReviewModule } from './review/review.module';
import { MediaModule } from './media/media.module';
import { PersonModule } from './person/person.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [ 
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ApiModule,
    AuthModule,
    ReviewModule,
    MediaModule,
    PersonModule,
    FavoritesModule
  ],
})
export class AppModule {}
