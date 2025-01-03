import { Injectable } from "@nestjs/common";
import { IIdGenerator } from "../interfaces/id-generator";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UuidService implements IIdGenerator {
  generate(): string {
    return uuidv4();
  }
}