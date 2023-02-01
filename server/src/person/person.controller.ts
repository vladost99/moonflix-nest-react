import { Controller, Get, Param,  UsePipes, ValidationPipe } from '@nestjs/common';
import { PersonService } from './person.service';
import { IPerson } from 'src/api/interfaces/person-detail.interface';
import { IPersonMedias } from 'src/api/interfaces/person-medias.interface';
import { OnlyNumber } from 'src/pipes/only-number.pipe';

@Controller('person')
export class PersonController {


    constructor(private readonly personService: PersonService) {}

    @Get('/:personId')
    @UsePipes(new ValidationPipe())
    async getDetail(@Param('personId', OnlyNumber) personId: number): Promise<IPerson> {
        return await this.personService.getDetail(personId);
    }

    @UsePipes(new ValidationPipe())
    @Get('/:personId/medias')
    async getMedias(@Param('personId', OnlyNumber) personId: number): Promise<IPersonMedias> {
        return await this.personService.getMedias(personId);
    }
}
