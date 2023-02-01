import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserEntity } from 'src/auth/user.entity';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type FavoriteDocument = HydratedDocument<FavoriteEntity>;

@Schema({ collection: 'Favourite', timestamps: true})
export class FavoriteEntity {

    @Prop({type: MongooseSchema.Types.ObjectId, ref: 'User'})
    user: UserEntity;
    

    @Prop({ required: true, enum: ['tv', 'movie'] })
    mediaType: string;

    @Prop({ required: true })
    mediaId: string;

    @Prop({ required: true })
    mediaTitle: string;

    @Prop({ required: true })
    mediaPoster: string;

    @Prop({ required: true })
    mediaRate: number;
}

export const FavoriteSchema = SchemaFactory.createForClass(FavoriteEntity);