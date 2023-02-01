import { Controller, Post, Body, Delete, Param, HttpCode, Get, UseGuards, ValidationPipe, UsePipes } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { FavoriteEntity } from './favorite.entity';

@Controller('favorites')
export class FavoritesController {
    constructor(private readonly FavouritesService: FavoritesService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post('/')
    @UsePipes(new ValidationPipe())
    async add(@Body() body: CreateFavoriteDto, @User('_id') userId: string): Promise<FavoriteEntity> {
        return await this.FavouritesService.addFavourite(userId, body);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('/:favoriteId')
    @HttpCode(200)
    async remove(@Param('favoriteId') favoriteId: string, @User('_id') userId: string): Promise<void> {
        return await this.FavouritesService.removeFavourite(userId, favoriteId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/')
    async getFavouritesOfUser(@User('_id') userId: string): Promise<FavoriteEntity[]> {
        return await this.FavouritesService.getFavouritesUser(userId);
    }
}
