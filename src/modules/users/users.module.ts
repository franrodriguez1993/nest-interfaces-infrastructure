import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { EntitiesModule } from '../../database/entities.module';
import { UserSQLRepository } from './repository/user-sql.repository';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../database/schemas/user.schema';
import { UserMongooseRepository } from './repository/user-mongo.repository';
import { UuidService } from '../../shared/utils/uuid.service';

@Module({
  imports: [
     ConfigModule.forRoot(),
    EntitiesModule,
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),],
  controllers: [UsersController],
  providers: [
    UsersService,
    { provide: 'UserRepository', useClass: UserMongooseRepository },
    {provide:'IdGenerator',useClass:UuidService}
  ],
})
export class UsersModule {}
