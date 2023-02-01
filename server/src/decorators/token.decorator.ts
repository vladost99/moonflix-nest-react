import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export const Token = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    
    if(!token) return '';
    

    return token;
  },
);