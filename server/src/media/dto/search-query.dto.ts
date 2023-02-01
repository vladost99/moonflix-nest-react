import { IsNumber, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class SearchQueryDto {
    @Transform(({ value }) => Number(value))
    @IsNumber()
    page: number;

    @Transform(({ value }) => value)
    @IsString()
    query: string;
}