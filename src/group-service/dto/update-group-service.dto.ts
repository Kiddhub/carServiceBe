import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateGroupServiceDto } from './create-group-service.dto';
import { IsOptional } from 'class-validator';

export class UpdateGroupServiceDto extends PartialType(CreateGroupServiceDto) {
  @ApiProperty()
  @IsOptional()
  key?: string;
  @ApiProperty()
  @IsOptional()
  value?: string;
  @ApiProperty()
  @IsOptional()
  status?: string;
}
