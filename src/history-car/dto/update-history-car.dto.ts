import { PartialType } from '@nestjs/swagger';
import { CreateHistoryCarDto } from './create-history-car.dto';

export class UpdateHistoryCarDto extends PartialType(CreateHistoryCarDto) {}
