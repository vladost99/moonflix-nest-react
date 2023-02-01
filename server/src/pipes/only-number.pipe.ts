
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class OnlyNumber implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const reg = /^\d+$/;
    const res = reg.test(value);

    if(!res) {
     throw new BadRequestException('Param must be number');
    }

    return Number(value);
  }
}