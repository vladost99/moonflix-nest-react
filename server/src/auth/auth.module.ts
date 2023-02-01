import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity, UserSchema } from 'src/auth/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJWTConfig } from 'src/configs/jwt.config';
import { JwtStratagy } from './strategies/jwt.stratagy';
import { GoogleStrategy } from './strategies/google.stratagy';

@Module({
  imports: [
    MongooseModule.forFeature([{name: UserEntity.name, schema: UserSchema}]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJWTConfig
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStratagy, GoogleStrategy, ConfigService],
  exports: [AuthService]
})
export class AuthModule {}
