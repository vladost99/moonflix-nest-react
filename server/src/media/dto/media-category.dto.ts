import {  IsString } from "class-validator";
import { Transform } from "class-transformer";
import { matchOnlyString } from "src/helpers/match-only-string.helper";

export class MediaCategoryDto {
    @Transform(({ value }) => matchOnlyString(value) && value)
    @IsString()
    mediaType: string;

    @Transform(({ value }) =>  /\D/.test(value) && value)
    @IsString()
    mediaCategory: string;
}