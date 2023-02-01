
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { matchOnlyString } from 'src/helpers/match-only-string.helper';

@Injectable()
export class OnlyString implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const res =  matchOnlyString(value)

    if(!res) {
      throw new BadRequestException('Param must be string');
    }

    return value;
  }
}