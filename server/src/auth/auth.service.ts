import { Injectable,  BadRequestException } from '@nestjs/common';
import { UserDocument, UserEntity } from 'src/auth/user.entity';
import { InjectModel,  } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { hash, genSalt, compare } from 'bcryptjs';
import { IUserResponse } from './types/userResponse.type';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { IJwtPayload } from './types/jwt-payload.type';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { IGoogleUser } from './types/google-user.interface';
import * as generator from 'generate-password';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(UserEntity.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    private validToken(token: string): IJwtPayload | null {
        try {
            return this.jwtService.verify(token);
        }
        catch(err) {
            return null;
        }
    }

    private generatePassword(): string {
       return generator.generate({
        length: 20,
        numbers: true,
        symbols: true
       })
    }

    async validAndGetUser(token: string): Promise<UserEntity | null> {
        const decode = this.validToken(token);

        if(!decode) return null;

        const user = await this.userExist(decode._id);

        return user && {...user, _id: String(user._id)} || null;
    }

    private generateAccessToken(userData: IUserResponse): string {
        const token = this.jwtService.sign(userData, {expiresIn: '1d'});
        return token;
    }

    private formatResponse(user: UserEntity): IUserResponse {
        const responseData: IUserResponse = { username: user.username, displayName: user.displayName, _id: String(user._id)};

        return  {...responseData, token: this.generateAccessToken(responseData)};
    }

    async userExist(_id: string): Promise<UserEntity | null> {
        return await this.userModel.findById(_id);
    }


    async signup(createUserDto: CreateUserDto): Promise<IUserResponse> {

        if(createUserDto.password !== createUserDto.confirmPassword) {
            throw new BadRequestException('passwords do not match');
        }
       
        
        const userExist = await this.userModel.findOne({ username: createUserDto.username });


        if(userExist) {
            throw new BadRequestException('username already used');
        }

        const newUser =  new this.userModel(createUserDto);
        newUser.salt = await genSalt(10);
        newUser.password = await hash(newUser.password, newUser.salt);

        await newUser.save();
        
        return this.formatResponse(newUser);
    }

    async signin(signInUserDto: SignInUserDto): Promise<IUserResponse> {
        const userExist = await this.userModel.findOne({ username: signInUserDto.username });

        if(!userExist) {
            throw new BadRequestException('User is not exists');
        }

        if(!(await compare(signInUserDto.password, userExist.password))) {
            throw new BadRequestException('Wrong password');
        }

        return this.formatResponse(userExist);

    }

    async getUserInfo(_id: string): Promise<IUserResponse> {
        const userExist = await this.userExist(_id);

        if(!userExist) {
            throw new BadRequestException('User not found')
        }

        return this.formatResponse(userExist);
    }

    async updatePassword(body: UpdatePasswordDto, userId: string): Promise<void> {
        if(body.newPassword !== body.confirmPassword) {
            throw new BadRequestException('passwords do not match');
        }

        const user: any = await this.userExist(userId);

        

        if(!user) {
            throw new BadRequestException('User is not exists');
        }

        user.salt = await genSalt(10);
        user.password = await hash(body.newPassword, user.salt);

        await user.save();
    }

    async googleLogin(user: IGoogleUser): Promise<string> {
        let userFind = await this.userModel.findOne({username: user.username});

        if(!userFind) {
            userFind = new this.userModel({
                ...user,
                password: this.generatePassword(),
            });
            userFind.salt = await genSalt(10);
            userFind.password = await hash(userFind.password, userFind.salt);

            await userFind.save();
        }

        return this.generateAccessToken({ username: userFind.username, displayName: userFind.displayName, _id: String(userFind._id)});
    }
}
