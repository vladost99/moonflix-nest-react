import { IsNumber, IsString } from "class-validator";
import { Transform } from "class-transformer";
import { matchOnlyString } from "src/helpers/match-only-string.helper";
export class MediaDetailParamsDto {
    @Transform(({ value }) => Number(value))
    @IsNumber()
    mediaId: number;

    @Transform(({ value }) =>  matchOnlyString(value) && value)
    @IsString()
    mediaType: string;
}