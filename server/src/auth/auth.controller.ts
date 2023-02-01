import { Controller, Post, Body, UsePipes, ValidationPipe, UseGuards,Get, HttpCode, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { IUserResponse } from './types/userResponse.type';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { Response } from 'express';
import { User } from 'src/decorators/user.decorator';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { IGoogleUser } from './types/google-user.interface';


@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('/signup')
    @UsePipes(new ValidationPipe())
    async signup(@Body() createUserDto: CreateUserDto, @Res({ passthrough: true }) res: Response): Promise<IUserResponse> {
        const user = await this.authService.signup(createUserDto);

        res.cookie('user', JSON.stringify({ _id: user._id, username: user.username, displayName: user.displayName}), { maxAge: 3600000 * 24 * 2 });
        res.cookie('access_token', user.token, { maxAge: 3600000 * 24 * 1})
        
        return user;
    }

    @Post('/signin')
    @HttpCode(200)
    @UsePipes(new ValidationPipe())
    async signin(@Body() signInUserDto: SignInUserDto, @Res({ passthrough: true }) res: Response): Promise<IUserResponse> {
        const user = await this.authService.signin(signInUserDto);
        
        res.cookie('user', JSON.stringify({ _id: user._id, username: user.username, displayName: user.displayName}), { maxAge: 3600000 * 24 * 2 });
        res.cookie('access_token', user.token, { maxAge: 3600000 * 24 * 1})
        
        return user;
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/profile')
    async getInfo(@User('_id') id: string, @Res({ passthrough: true }) res: Response): Promise<IUserResponse> {
       const user = await this.authService.getUserInfo(id);
          
       res.cookie('user', JSON.stringify({ _id: user._id, username: user.username, displayName: user.displayName}), { maxAge: 3600000 * 24 * 2 });
       res.cookie('access_token', user.token, { maxAge: 3600000 * 24 * 1})
       
       return user;
    }

    @UsePipes(new ValidationPipe())
    @UseGuards(AuthGuard('jwt'))
    @Post('/update-password')
    @HttpCode(200)
    async updatePassword(@Body() body: UpdatePasswordDto, @User('_id') userId: string, @Res({ passthrough: true }) res: Response): Promise<void> {
        await this.authService.updatePassword(body, userId);
        res.clearCookie('user');
        res.clearCookie('access_token');
    }




    @UseGuards(AuthGuard('google'))
    @Get('/google')
    async googleLogin() {}


    @UsePipes(new ValidationPipe())
    @UseGuards(AuthGuard('google'))
    @HttpCode(200)
    @Get('/google/callback')
    async googleCallback(@User() user: IGoogleUser, @Res() res: Response) {
       const access_token = await this.authService.googleLogin(user);

       res.redirect(`${process.env.CLIENT_URL}/auth/success/${access_token}`);
    }

}
