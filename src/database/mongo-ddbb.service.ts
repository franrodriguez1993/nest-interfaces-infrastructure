import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class MongoDatabaseService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  getDBHandle(): Connection {
    return this.connection;
  }
}
