import { Module } from '@nestjs/common';
import { TmbdAPI} from './tmbd.api';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { ApiService } from './api.service';

@Module({
  imports: [HttpModule.register({
    timeout: 5000,
    maxRedirects: 5,
    headers: { "Accept-Encoding": "gzip,deflate,compress" }
  })],
  providers: [TmbdAPI, ConfigService, ApiService],
  exports: [TmbdAPI]
})
export class ApiModule {}
