import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<UserEntity>;

@Schema({ collection: 'User'})
export class UserEntity {
    @Prop({ unique: true, required: true})
    username: string;

    @Prop({ required: true })
    displayName: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    salt: string;

    _id?: string;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
