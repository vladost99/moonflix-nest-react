import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { ApiModule } from 'src/api/api.module';
import { AuthModule } from 'src/auth/auth.module';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { ReviewModule } from 'src/review/review.module';

@Module({
  imports: [ApiModule, AuthModule, FavoritesModule, ReviewModule],
  controllers: [MediaController],
  providers: [MediaService]
})
export class MediaModule {}
