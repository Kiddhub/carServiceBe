import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserCarDto } from './create-user-car.dto';
import { IsString } from 'class-validator';

export class UpdateUserCarDto extends PartialType(CreateUserCarDto) {
    @ApiProperty()
    @IsString()
    mode?: string;
    @ApiProperty()
    @IsString()
    plateNumber?: string;
    @ApiProperty()
    @IsString()
    color?: string;
}
