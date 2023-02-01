import { Injectable, NotFoundException } from '@nestjs/common';
import { FavoriteEntity, FavoriteDocument } from './favorite.entity';
import { InjectModel  } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFavoriteDto } from './dto/create-favorite.dto';


@Injectable()
export class FavoritesService {
    constructor(@InjectModel(FavoriteEntity.name) private favoriteModel: Model<FavoriteDocument>) {}

    async addFavourite(userId: string, body: CreateFavoriteDto): Promise<FavoriteEntity> {
        const isFavourite = await this.favoriteModel.findOne({
            user: userId,
            mediaId: body.mediaId
        });

        if(isFavourite) return isFavourite;

        const favourite = new this.favoriteModel({
            ...body,
            user: userId
        });

        await favourite.save();

        return favourite;
    }


    async removeFavourite(userId: string, favouriteId: string): Promise<void> {
        const favourite = await this.favoriteModel.findOne({
            user: userId,
            _id: favouriteId
        });

        if(!favourite) throw new NotFoundException('Favourite not found');

        await favourite.remove();
    }

    async getFavouritesUser(userId: string): Promise<FavoriteEntity[]> {
       return await this.favoriteModel.find({ user: userId }).sort('-createdAt');
    }

    async getFavoriteUserById(userId: string, mediaId: string): Promise<FavoriteEntity | null> {
        return await this.favoriteModel.findOne({ user: userId, mediaId});
    }
}
