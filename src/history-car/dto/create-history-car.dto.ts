import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateHistoryCarDto {
  @ApiProperty()
  @IsString()
  carId: string;
}
