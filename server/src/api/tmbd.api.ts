import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { IGenres } from './interfaces/genre.interface';
import { IMediaList } from './interfaces/media-list.interface';
import { IImages } from './interfaces/images.interface';
import { ICredits } from './interfaces/credits.interface';
import { IRecommend } from './interfaces/recommend.interface';
import { IVideos } from './interfaces/videos.interface';
import { IFullMediaDetail, IMediaDetail } from './interfaces/media-detail.interface';
import { IPerson } from './interfaces/person-detail.interface';
import { IPersonMedias } from './interfaces/person-medias.interface';
import { ISearchResult } from './interfaces/search-result.interface';
import { ApiService } from './api.service';

@Injectable()
export class TmbdAPI {
    baseUrl: string;
    key: string;

    constructor(private readonly configService: ConfigService, private readonly api: ApiService) {
        this.baseUrl = this.configService.get<string>('TMDB_BASE_URL');
        this.key = this.configService.get<string>('TMDB_KEY');
    }

   private getUrl(endpoint: string, params?: object): string {
       let qs = '';
      
      
       if(params && Object.keys(params).length > 0) {
          const keys = Object.keys(params);
          qs = '&';
          keys.forEach((key, index) => {
            qs = `${qs}${key}=${params[key]}${keys[index + 1] ? `&` : ''}`;
          })
       }

        return `${this.baseUrl}/${endpoint}?api_key=${this.key}${qs}`;
    }


    async getMediaList({ mediaType, mediaCategory, page }): Promise<IMediaList> {
      return await this.api.getRequest<IMediaList>(this.getUrl(`${mediaType}/${mediaCategory}`, {page}));
    }

    async getMediaGenre({ mediaType }): Promise<IGenres> {
      return await this.api.getRequest<IGenres>(this.getUrl(`genre/${mediaType}/list`));
    }

    async search({ mediaType, page,  query }): Promise<ISearchResult> {
      return await this.api.getRequest<ISearchResult>(this.getUrl(`search/${mediaType === 'people' ? 'person' : mediaType}`, { query, page }));
    }
    async getDetail({ mediaType, mediaId }): Promise<IFullMediaDetail> {
        const main = await this.getMediaDetail({ mediaType, mediaId });


        const [credits, videos, recommend, images] = await Promise.all([
          this.getMediaCredits({ mediaType, mediaId }),
          this.getMediaVideos({ mediaType, mediaId }),
          this.getMediaRecommend({ mediaType, mediaId }),
          this.getMediaImages({ mediaType, mediaId })
        ]);

        return {...main, credits, videos, recommend, images};
    }

    async getMediaDetail({ mediaType, mediaId }): Promise<IMediaDetail> {
      return await this.api.getRequest<IMediaDetail>(this.getUrl(`${mediaType}/${mediaId}`));
    }

    async getMediaImages({ mediaType, mediaId }): Promise<IImages> {
      return await this.api.getRequest<IImages>(this.getUrl(`${mediaType}/${mediaId}/images`));
    }

    async getMediaRecommend({ mediaType, mediaId }): Promise<IRecommend> {
      return await this.api.getRequest<IRecommend>(this.getUrl(`${mediaType}/${mediaId}/recommendations`));
    }

    async getMediaVideos({ mediaType, mediaId }): Promise<IVideos> {
      return await this.api.getRequest<IVideos>(this.getUrl(`${mediaType}/${mediaId}/videos`));
    }

    async getMediaCredits({ mediaType, mediaId}): Promise<ICredits> {
      return await this.api.getRequest<ICredits>(this.getUrl(`${mediaType}/${mediaId}/credits`));
    }

    async getPersonDetail({ personId }): Promise<IPerson> {
      return await this.api.getRequest<IPerson>(this.getUrl(`person/${personId}`));
   }

    async getPersonMedias({ personId }): Promise<IPersonMedias> {
      return await this.api.getRequest<IPersonMedias>(this.getUrl(`person/${personId}/combined_credits`));
    }
}
