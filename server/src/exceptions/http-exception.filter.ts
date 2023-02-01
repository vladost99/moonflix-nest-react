import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.message;
    const error = exception.cause;
    
    response
      .status(status === 500 ? 400 : status)
      .json({
        status,
        "message":status === 500 ? "Something bad happened" : message,
        "error": status === 500 ? "Some error description" : error,
      });
  }
}