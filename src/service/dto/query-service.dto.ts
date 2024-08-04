import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { plainToInstance, Type } from 'class-transformer';
import { Transform } from 'class-transformer';
import { Service } from '../entities/service.entity';

export class FilterServiceDto {
  @ApiProperty()
  @IsOptional()
  groupServiceCode?: string;
  @ApiProperty()
  @IsOptional()
  name?: string;
}

export class SortServiceDto {
  @ApiProperty()
  @IsString()
  orderBy: keyof Service;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryServiceDto {
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
      return value ? plainToInstance(FilterServiceDto, value) : undefined;
    } catch (error) {
      // Nếu có lỗi phân tích cú pháp, có thể bạn muốn log lỗi hoặc xử lý theo cách khác
      console.error('Error parsing JSON:', error);
      return undefined;
    }
  })
  @ValidateNested({ each: true })
  @Type(() => FilterServiceDto)
  filters?: FilterServiceDto | null;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) => {
    try {
      // Cố gắng phân tích cú pháp chuỗi JSON. Nếu không phải là JSON hợp lệ, trả về undefined.
      return value ? plainToInstance(SortServiceDto, value) : undefined;
    } catch (error) {
      // Nếu có lỗi phân tích cú pháp, có thể bạn muốn log lỗi hoặc xử lý theo cách khác
      console.error('Error parsing JSON:', error);
      return undefined;
    }
  })
  @ValidateNested({ each: true })
  @Type(() => SortServiceDto)
  sort?: SortServiceDto[] | null;

  @IsOptional()
  searchText?: string;
}
