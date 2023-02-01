import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewEntity, ReviewSchema } from './review.entity';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { UserEntity, UserSchema } from 'src/auth/user.entity';
@Module({
    imports: [MongooseModule.forFeature([{name: ReviewEntity.name, schema: ReviewSchema}, {name: UserEntity.name, schema: UserSchema}])],
    controllers: [ReviewController],
    providers: [ReviewService],
    exports: [ReviewService]
})

export class ReviewModule {}
