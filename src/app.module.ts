import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { UtilsModule } from './shared/utils/util.module';
import { EntitiesModule } from './database/entities.module';
import { MySQLClientModule } from './database/mysql-client.module';
import { MongoClientModule } from './database/mongo-client.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    UtilsModule,
    EntitiesModule,
    MySQLClientModule,
    MongoClientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
