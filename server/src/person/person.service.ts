import { Injectable } from '@nestjs/common';
import { IPerson } from 'src/api/interfaces/person-detail.interface';
import { IPersonMedias } from 'src/api/interfaces/person-medias.interface';
import { TmbdAPI } from 'src/api/tmbd.api';

@Injectable()
export class PersonService {

    constructor(private readonly tmdbAPI: TmbdAPI) {}


    async getDetail(personId: number): Promise<IPerson> {
        return await this.tmdbAPI.getPersonDetail({ personId });
    }

    async getMedias(personId: number): Promise<IPersonMedias> {
        return await this.tmdbAPI.getPersonMedias({ personId });
    }
}
