import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoDatabaseService } from './mongo-ddbb.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI')
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [MongoDatabaseService],
  exports: [MongoDatabaseService],
})
export class MongoClientModule {}
