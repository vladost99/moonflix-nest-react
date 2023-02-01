import { Controller, Post, Param, Body, Delete, Get, ValidationPipe } from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import { ReviewService } from './review.service';
import { UseGuards, UsePipes } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('review')
export class ReviewController {

    constructor(private readonly reviewService: ReviewService) {}

    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe())
    @Post('/')
    async create(@User('_id') userId: string, @Body() body: CreateReviewDto) {
       return await this.reviewService.create(userId, body);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('/:reviewId')
    async remove(@Param('reviewId') reviewId: string, @User('_id') userId: string) {
        return await this.reviewService.remove(userId, reviewId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/')
    async getReviewOfUser(@User('_id') userId: string) {
        return await this.reviewService.getReviewsOfUser(userId);
    }
}
