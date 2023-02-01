import {IsNumber, IsString,IsNotEmpty  } from 'class-validator'


export class CreateFavoriteDto {
    @IsNotEmpty()
    mediaId: number;

    @IsString()
    @IsNotEmpty()
    mediaType: string;

    @IsString()
    @IsNotEmpty()
    mediaTitle: string;

    @IsString()
    @IsNotEmpty()
    mediaPoster: string;

    @IsNotEmpty()
    @IsNumber()
    mediaRate: number;
}