import { Injectable } from '@nestjs/common';
import { IGenres } from 'src/api/interfaces/genre.interface';
import { IMediaList } from 'src/api/interfaces/media-list.interface';
import { TmbdAPI } from 'src/api/tmbd.api';
import { AuthService } from 'src/auth/auth.service';
import { FavoritesService } from '../favorites/favorites.service';
import { ReviewService } from 'src/review/review.service';
import { IFullMediaDetail } from 'src/api/interfaces/media-detail.interface';
import { ISearchResult } from 'src/api/interfaces/search-result.interface';

@Injectable()
export class MediaService {
    constructor(
        private readonly tmdbAPI: TmbdAPI,
        private readonly authService: AuthService,
        private readonly favoriteService: FavoritesService,
        private readonly reviewService: ReviewService
    ) {}


    async getList(category: string, type: string, page?: number): Promise<IMediaList> {
        return  await this.tmdbAPI.getMediaList({ mediaCategory: category, mediaType: type, page });
    }

    async getDetail(mediaId: number,  mediaType: string, token: string): Promise<IFullMediaDetail> {
      const media = await this.tmdbAPI.getDetail({ mediaId, mediaType });
      
      const user = await this.authService.validAndGetUser(token);

      if(user) {
        const isFavorite = await this.favoriteService.getFavoriteUserById(user._id, String(mediaId));
        media.isFavorite = isFavorite !== null;
      }

      media.reviews = await this.reviewService.getReviewsAllUser(String(mediaId));

      return media;

    }

    async getGenres(mediaType: string): Promise<IGenres> {
       return await this.tmdbAPI.getMediaGenre({ mediaType });
    }

    async search(mediaType: string, page: number, query: string): Promise<ISearchResult> {
        return await this.tmdbAPI.search({ mediaType, page, query });
    }
}
