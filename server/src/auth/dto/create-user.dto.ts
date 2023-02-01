import { IsNotEmpty, IsString, MinLength  } from 'class-validator';


export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    username: string;

    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @IsNotEmpty()
    @MinLength(8)
    confirmPassword: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    displayName: string;
}