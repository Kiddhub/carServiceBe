import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateHistoryCarDto } from './create-history-car.dto';
import { IsString } from 'class-validator';

export class UpdateHistoryCarDto extends PartialType(CreateHistoryCarDto) {
  @ApiProperty()
  @IsString()
  plateNumber?: string;
}
