import { Injectable } from '@nestjs/common';
import { CreateHistoryCarDto } from './dto/create-history-car.dto';
import { HistoryCar } from './entities/history-car.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  FilterHistoryCarDto,
  SortHistoryCarDto,
} from './dto/query-history-car.dto';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { UpdateHistoryCarDto } from './dto/update-history-car.dto';

@Injectable()
export class HistoryCarService {
  constructor(
    @InjectRepository(HistoryCar)
    private readonly historyCarRepository: Repository<HistoryCar>,
  ) {}

  async checkIn(currentUser: any, createHistoryCarDto: CreateHistoryCarDto) {
    const car = this.historyCarRepository.findOne({
      where: {
        plateNumber: createHistoryCarDto.plateNumber,
        status: 'CHECKIN',
      },
    });
    if (car !== null) {
      throw new Error('Car is already checked in');
    } else {
      const historyCar = new HistoryCar();
      historyCar.plateNumber = createHistoryCarDto.plateNumber;
      historyCar.userId = currentUser.id;
      historyCar.checkIn = new Date();
      historyCar.status = 'CHECKIN';
      return this.historyCarRepository.save(historyCar);
    }
  }

  async findAll({
    filterOptions,
    sortOptions,
    paginationOptions,
    searchText,
  }: {
    filterOptions?: FilterHistoryCarDto | null;
    sortOptions?: SortHistoryCarDto[] | null;
    paginationOptions: IPaginationOptions;
    searchText?: string;
  }): Promise<[HistoryCar[], number]> {
    const query = this.historyCarRepository.createQueryBuilder('history_car');
    if (filterOptions?.plateNumber) {
      query.andWhere('history_car.plateNumber = :plateNumber', {
        plateNumber: filterOptions.plateNumber,
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
      query.where('history_car.plateNumber LIKE :searchText', {
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

  async findByUser({
    filterOptions,
    sortOptions,
    paginationOptions,
    searchText,
    currentUser,
  }: {
    filterOptions?: FilterHistoryCarDto | null;
    sortOptions?: SortHistoryCarDto[] | null;
    paginationOptions: IPaginationOptions;
    searchText?: string;
    currentUser: any;
  }): Promise<[HistoryCar[], number]> {
    const query = this.historyCarRepository
      .createQueryBuilder('history_car')
      .where('history_car.userId = :userId', { userId: currentUser.id });
    if (filterOptions?.plateNumber) {
      query.andWhere('history_car.plateNumber = :plateNumber', {
        plateNumber: filterOptions.plateNumber,
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
      query.where('history_car.plateNumber LIKE :searchText', {
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

  findOne(id: number) {
    return `This action returns a #${id} historyCar`;
  }

  async checkOut(currentUser: any, updateHistoryCarDto: UpdateHistoryCarDto) {
    const historyCar = await this.historyCarRepository.findOne({
      where: {
        plateNumber: updateHistoryCarDto.plateNumber,
        status: 'CHECKIN',
        userId: currentUser.id,
      },
    });
    if (historyCar === null) {
      throw new Error('Car is not checked in');
    } else {
      historyCar.checkOut = new Date();
      historyCar.status = 'CHECKOUT';
      return this.historyCarRepository.save(historyCar);
    }
  }
}
