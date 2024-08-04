import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateServiceDto } from './create-service.dto';
import { IsString } from 'class-validator';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {
  @ApiProperty()
  @IsString()
  groupServiceCode?: string;
  @ApiProperty()
  @IsString()
  name?: string;
  @ApiProperty()
  @IsString()
  description?: string;
}
