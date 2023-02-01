import { Controller, Get, Param, Query, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { MediaService } from './media.service';
import { IGenre } from 'src/api/interfaces/genre.interface';
import { IMediaList } from 'src/api/interfaces/media-list.interface';
import { Token } from 'src/decorators/token.decorator';
import { IFullMediaDetail } from 'src/api/interfaces/media-detail.interface';
import { ISearchResult } from 'src/api/interfaces/search-result.interface';
import { OnlyString } from 'src/pipes/only-string.pipe';
import { MediaDetailParamsDto } from './dto/media-detail-params.dto';
import { MediaCategoryDto } from './dto/media-category.dto';
import { SearchQueryDto } from './dto/search-query.dto';


@Controller('media')
export class MediaController {
    constructor(private readonly mediaService: MediaService) {}

    @UsePipes(new ValidationPipe())
    @Get('/:mediaType/search')
    async search(@Param('mediaType', OnlyString) mediaType: string, @Query() {page, query}: SearchQueryDto): Promise<ISearchResult> {
        return await this.mediaService.search(mediaType, page, query);
    }

    @UsePipes(new ValidationPipe())
    @Get('/:mediaType/genres')
    async genres(@Param('mediaType', OnlyString) mediaType: string): Promise<IGenre[]> {
        const results = await this.mediaService.getGenres(mediaType);

        return results.genres;
    }

    @UsePipes(new ValidationPipe())
    @Get('/:mediaType/detail/:mediaId')
    async detail(@Param() {mediaId, mediaType}: MediaDetailParamsDto, @Token() token: string): Promise<IFullMediaDetail> {
        return await this.mediaService.getDetail(mediaId,  mediaType, token);
    }
    
    @UsePipes(new ValidationPipe())
    @Get('/:mediaType/:mediaCategory')
    async getCategory(@Param() { mediaType, mediaCategory }: MediaCategoryDto, @Query('page', ParseIntPipe) page?: number): Promise<IMediaList> {
       return  await this.mediaService.getList(mediaCategory, mediaType, page);
    }
}
