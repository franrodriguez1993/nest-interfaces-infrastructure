import { Module } from '@nestjs/common';
import { HashService } from './hash.service';
import { UuidService } from './uuid.service';

@Module({ providers: [HashService,UuidService] })
export class UtilsModule {}
