import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { plainToInstance, Type } from 'class-transformer';
import { Transform } from 'class-transformer';
import { HistoryCar } from '../entities/history-car.entity';

export class FilterHistoryCarDto {
  @ApiProperty()
  @IsOptional()
  carId?: string;
  @ApiProperty()
  @IsOptional()
  checkIn?: Date;
  @ApiProperty()
  @IsOptional()
  checkOut?: Date;
}

export class SortHistoryCarDto {
  @ApiProperty()
  @IsString()
  orderBy: keyof HistoryCar;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryHistoryCarDto {
  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page: number;

  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit: number;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) => {
    try {
      // Cố gắng phân tích cú pháp chuỗi JSON. Nếu không phải là JSON hợp lệ, trả về undefined.
      return value ? plainToInstance(FilterHistoryCarDto, value) : undefined;
    } catch (error) {
      // Nếu có lỗi phân tích cú pháp, có thể bạn muốn log lỗi hoặc xử lý theo cách khác
      console.error('Error parsing JSON:', error);
      return undefined;
    }
  })
  @ValidateNested({ each: true })
  @Type(() => FilterHistoryCarDto)
  filters?: FilterHistoryCarDto | null;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) => {
    try {
      // Cố gắng phân tích cú pháp chuỗi JSON. Nếu không phải là JSON hợp lệ, trả về undefined.
      return value ? plainToInstance(SortHistoryCarDto, value) : undefined;
    } catch (error) {
      // Nếu có lỗi phân tích cú pháp, có thể bạn muốn log lỗi hoặc xử lý theo cách khác
      console.error('Error parsing JSON:', error);
      return undefined;
    }
  })
  @ValidateNested({ each: true })
  @Type(() => SortHistoryCarDto)
  sort?: SortHistoryCarDto[] | null;

  @IsOptional()
  searchText?: string;
}
