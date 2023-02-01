import { Injectable, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class ApiService {

     constructor(private readonly httpService: HttpService) {}


     async getRequest<Type>(urlRequest: string): Promise<Type> {
        const { data } = await firstValueFrom(
          this.httpService.get<Type>(urlRequest).pipe(
            catchError((error: AxiosError) => {
              throw new BadRequestException('An error happened!')
            })
          )
        );
    
        return data
    }

}
