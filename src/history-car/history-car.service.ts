import { Injectable } from '@nestjs/common';
import { CreateHistoryCarDto } from './dto/create-history-car.dto';
import { UpdateHistoryCarDto } from './dto/update-history-car.dto';
import { HistoryCar } from './entities/history-car.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  FilterHistoryCarDto,
  SortHistoryCarDto,
} from './dto/query-history-car.dto';
import { IPaginationOptions } from '../utils/types/pagination-options';

@Injectable()
export class HistoryCarService {
  constructor(
    @InjectRepository(HistoryCar)
    private readonly historyCarRepository: Repository<HistoryCar>,
  ) {}

  async checkIn(createHistoryCarDto: CreateHistoryCarDto) {
    const historyCar = new HistoryCar();
    historyCar.carId = createHistoryCarDto.carId;
    historyCar.checkIn = new Date();
    return this.historyCarRepository.save(historyCar);
  }

  async findAll({
    filterOptions,
    sortOptions,
    paginationOptions,
    searchText,
  }: {
    filterOptions?: FilterHistoryCarDto;
    sortOptions?: SortHistoryCarDto[] | null;
    paginationOptions: IPaginationOptions;
    searchText?: string;
  }): Promise<[HistoryCar[], number]> {
    const query = this.historyCarRepository.createQueryBuilder('history_car');
    if (filterOptions?.carId) {
      query.andWhere('history_car.carId = :carId', {
        carId: filterOptions.carId,
      });
    } else if (filterOptions?.checkIn) {
      query.andWhere('history_car.checkIn = :checkIn', {
        checkIn: filterOptions.checkIn,
      });
    } else if (filterOptions?.checkOut) {
      query.andWhere('history_car.checkOut = :checkOut', {
        checkOut: filterOptions.checkOut,
      });
    }

    // Search
    if (searchText) {
      query.where('history_car.carId LIKE :searchText', {
        searchText: `%${searchText.toUpperCase()}%`,
      });
    }

    // Sorting
    if (sortOptions) {
      sortOptions.forEach((sortOption) => {
        query.addOrderBy(
          `history_car.${sortOption.orderBy}`,
          sortOption.order as 'ASC' | 'DESC',
        );
      });
    }

    // Pagination
    const [historyCars, total] = await query
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .take(paginationOptions.limit)
      .getManyAndCount();
    return [historyCars, total];
  }

  // findByUser({
  //   filterOptions,
  //   sortOptions,
  //   paginationOptions,
  //   searchText,
  //   currentUser,
  // }: {
  //   filterOptions?: FilterHistoryCarDto;
  //   sortOptions?: SortHistoryCarDto[] | null;
  //   paginationOptions: IPaginationOptions;
  //   searchText?: string;
  //   currentUser: any;
  // }): Promise<[HistoryCar[], number]> {
  //   return;
  // }

  findOne(id: number) {
    return `This action returns a #${id} historyCar`;
  }

  checkOut(id: number, updateHistoryCarDto: UpdateHistoryCarDto) {
    return `This action updates a #${id} historyCar`;
  }

  remove(id: number) {
    return `This action removes a #${id} historyCar`;
  }
}
