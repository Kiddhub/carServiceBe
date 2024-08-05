import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { plainToInstance, Type } from 'class-transformer';
import { Transform } from 'class-transformer';
import { Material } from '../entities/material.entity';

export class FilterMaterialDto {
  @ApiProperty()
  @IsOptional()
  name?: string;
  @ApiProperty()
  @IsOptional()
  groupServiceCode?: string;
}

export class SortMaterialDto {
  @ApiProperty()
  @IsString()
  orderBy: keyof Material;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryMaterialDto {
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
      return value ? plainToInstance(FilterMaterialDto, value) : undefined;
    } catch (error) {
      // Nếu có lỗi phân tích cú pháp, có thể bạn muốn log lỗi hoặc xử lý theo cách khác
      console.error('Error parsing JSON:', error);
      return undefined;
    }
  })
  @ValidateNested({ each: true })
  @Type(() => FilterMaterialDto)
  filters?: FilterMaterialDto | null;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) => {
    try {
      // Cố gắng phân tích cú pháp chuỗi JSON. Nếu không phải là JSON hợp lệ, trả về undefined.
      return value ? plainToInstance(SortMaterialDto, value) : undefined;
    } catch (error) {
      // Nếu có lỗi phân tích cú pháp, có thể bạn muốn log lỗi hoặc xử lý theo cách khác
      console.error('Error parsing JSON:', error);
      return undefined;
    }
  })
  @ValidateNested({ each: true })
  @Type(() => SortMaterialDto)
  sort?: SortMaterialDto[] | null;

  @IsOptional()
  searchText?: string;
}
