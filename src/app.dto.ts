import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AppDto {
  @IsString()
  @ApiProperty()
  text: string;
}
