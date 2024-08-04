import { IPaginationOptions } from './types/pagination-options';
import { InfinityPaginationResponseDto } from './dto/infinity-pagination-response.dto';
import { InfinityPaginationAndCountResultType } from './types/infinity-pagination-result.type';

export const infinityPagination = <T>(
  data: T[],
  options: IPaginationOptions,
): InfinityPaginationResponseDto<T> => {
  return {
    data,
    hasNextPage: data.length === options.limit,
  };
};

export const infinityAndCountPagination = <T>(
  data: [T[], number],
  options: IPaginationOptions,
): InfinityPaginationAndCountResultType<T> => {
  return {
    data: data[0],
    hasNextPage: data[0].length === options.limit,
    total: data[1],
  };
};
