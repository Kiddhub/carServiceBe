import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { plainToInstance, Type } from 'class-transformer';
import { Transform } from 'class-transformer';
import { UserCar } from '../entities/user-car.entity';

export class FilterUserCarDto {
  @ApiProperty()
  @IsOptional()
  plateNumber?: string;
  @ApiProperty()
  @IsOptional()
  mode?: string;
}

export class SortUserCarDto {
  @ApiProperty()
  @IsString()
  orderBy: keyof UserCar;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryUserCarDto {
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
      return value ? plainToInstance(FilterUserCarDto, value) : undefined;
    } catch (error) {
      // Nếu có lỗi phân tích cú pháp, có thể bạn muốn log lỗi hoặc xử lý theo cách khác
      console.error('Error parsing JSON:', error);
      return undefined;
    }
  })
  @ValidateNested({ each: true })
  @Type(() => FilterUserCarDto)
  filters?: FilterUserCarDto | null;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) => {
    try {
      // Cố gắng phân tích cú pháp chuỗi JSON. Nếu không phải là JSON hợp lệ, trả về undefined.
      return value ? plainToInstance(SortUserCarDto, value) : undefined;
    } catch (error) {
      // Nếu có lỗi phân tích cú pháp, có thể bạn muốn log lỗi hoặc xử lý theo cách khác
      console.error('Error parsing JSON:', error);
      return undefined;
    }
  })
  @ValidateNested({ each: true })
  @Type(() => SortUserCarDto)
  sort?: SortUserCarDto[] | null;

  @IsOptional()
  searchText?: string;
}
