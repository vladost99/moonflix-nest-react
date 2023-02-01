import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserEntity } from 'src/auth/user.entity';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type ReviewDocument = HydratedDocument<ReviewEntity>;

@Schema({timestamps: true,  collection: 'Review'})
export class ReviewEntity {

    @Prop({type: MongooseSchema.Types.ObjectId, ref:  'User'})
    user: UserEntity;
    
    @Prop({ required: true })
    content: string;

    @Prop({ required: true, enum: ['tv', 'movie'] })
    mediaType: string;

    @Prop({ required: true })
    mediaId: string;

    @Prop({ required: true })
    mediaTitle: string;

    @Prop({ required: true })
    mediaPoster: string;
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewEntity);
