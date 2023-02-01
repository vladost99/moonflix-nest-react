import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReviewDocument, ReviewEntity } from './review.entity';
import { UserDocument, UserEntity } from 'src/auth/user.entity';
import { CreateReviewDto } from './dto/create-review.dto';


@Injectable()
export class ReviewService {

    constructor(
        @InjectModel(ReviewEntity.name) private reviewModel: Model<ReviewDocument>,
        @InjectModel(UserEntity.name) private userModel: Model<UserDocument>
        ) {}

    async create(userId: string, body: CreateReviewDto) {
        const review = new this.reviewModel({
            user: userId,
            ...body
        });

        await review.save();

        return review;
    }

    async remove(userId: string, reviewId: string) {
        const review = await this.reviewModel.findOne({
            _id: reviewId,
            user: userId
        });

        if(!review) throw new NotFoundException('Review not found');

        await review.remove();
    }

    async getReviewsOfUser(userId: string) {
        const reviews = await this.reviewModel.find({
            user: userId
        }).sort('-createdAt');

        return reviews;
    }

    async getReviewsAllUser(mediaId: string): Promise<ReviewEntity[]> {
        return await this.reviewModel.find({ mediaId }).populate('user', '',  this.userModel).sort('-createdAt');
    }
}
