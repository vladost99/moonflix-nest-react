import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { IJwtPayload } from '../types/jwt-payload.type';

@Injectable()
export class JwtStratagy extends PassportStrategy(Strategy) {
	constructor(private readonly configService: ConfigService, private authService: AuthService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: true,
			secretOrKey: configService.get('TOKEN_SECRET')
		});
	}

	async validate(payload: IJwtPayload): Promise<IJwtPayload> {

		if(!payload._id) {
			throw new UnauthorizedException();
	   }

		const userExist = await this.authService.userExist(payload._id);

		if(!userExist) {
		 	throw new UnauthorizedException();
		}
		
		
		return { ...payload };
	}
}