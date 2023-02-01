import { IsNotEmpty, MinLength } from "class-validator";

export class CreateReviewDto {
    @IsNotEmpty()
    mediaId: string;

    @IsNotEmpty()
    mediaType: string;

    @IsNotEmpty()
    mediaTitle: string;

    @IsNotEmpty()
    mediaPoster: string;

    @MinLength(3)
    @IsNotEmpty()
    content: string;
}