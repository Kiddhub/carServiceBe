import { PartialType } from '@nestjs/swagger';
import { CreateUserCarDto } from './create-user-car.dto';

export class UpdateUserCarDto extends PartialType(CreateUserCarDto) {}
