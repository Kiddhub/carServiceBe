import { Injectable } from '@nestjs/common';
import { CreateGroupServiceDto } from './dto/create-group-service.dto';
import { UpdateGroupServiceDto } from './dto/update-group-service.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, QueryFailedError } from 'typeorm';
import { GroupService } from './entities/group-service.entity';
import { throwCustomException } from '../utils/throw-exception-helper';
import {
  FilterGroupServiceDto,
  SortGroupServiceDto,
} from './dto/query-group-service.dto';
import { IPaginationOptions } from '../utils/types/pagination-options';

@Injectable()
export class GroupServiceService {
  constructor(
    @InjectEntityManager('default')
    private readonly entityManager: EntityManager,
  ) {}

  async create(createGroupServiceDto: CreateGroupServiceDto) {
    return await this.entityManager.transaction(async (manager) => {
      try {
        const groupService = await manager.findBy(GroupService, {
          key: createGroupServiceDto.key,
        });
        if (groupService) {
          throwCustomException('Group service already exists');
        }
        const newGroupService = manager.create(
          GroupService,
          createGroupServiceDto,
        );
        return await manager.save(newGroupService);
      } catch (error) {
        if (error instanceof QueryFailedError) {
          throwCustomException(error.message);
        } else {
          throwCustomException(
            'An error occurred while creating group service',
          );
        }
      }
    });
  }

  async findAll() {
    return await this.entityManager.find(GroupService);
  }

  findOne(id: number) {
    const groupService = this.entityManager.findOne(GroupService, {
      where: { id },
    });
    if (!groupService) {
      throwCustomException('Group service not found');
    }
    return groupService;
  }

  async update(id: number, updateGroupServiceDto: UpdateGroupServiceDto) {
    return await this.entityManager.transaction(async (manager) => {
      try {
        const groupService = await manager.findOne(GroupService, {
          where: { id },
        });
        if (!groupService) {
          throwCustomException('Group service not found');
        } else {
          manager.merge(GroupService, groupService, updateGroupServiceDto);
          return await manager.save(groupService);
        }
      } catch (error) {
        if (error instanceof QueryFailedError) {
          throwCustomException(error.message);
        } else {
          throwCustomException(
            'An error occurred while updating group service',
            error.message,
          );
        }
      }
    });
  }

  async findGroupServiceWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
    searchText,
  }: {
    filterOptions?: FilterGroupServiceDto | null;
    sortOptions?: SortGroupServiceDto[] | null;
    paginationOptions: IPaginationOptions;
    searchText?: string;
  }): Promise<[GroupService[], number]> {
    const queryBuilder = this.entityManager.createQueryBuilder(
      GroupService,
      'groupService',
    );
    if (filterOptions?.key) {
      queryBuilder.where('groupService.key = :key', { key: filterOptions.key });
    } else if (filterOptions?.status) {
      queryBuilder.where('groupService.status = :status', {
        status: filterOptions.status,
      });
    }
    // Search
    if (searchText) {
      queryBuilder.where('groupService.key LIKE :searchText', {
        searchText: `%${searchText.toUpperCase()}%`,
      });
    }

    // Sort
    if (sortOptions && sortOptions?.length > 0) {
      sortOptions.forEach((sort: any) => {
        queryBuilder.orderBy(
          `groupService.${sort.orderBy}`,
          sort.order.toUpperCase(),
        );
      });
    }

    // Pagination
    const [groupServices, total] = await queryBuilder
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .take(paginationOptions.limit)
      .getManyAndCount();
    return [groupServices, total];
  }

  remove(id: number) {
    return `This action removes a #${id} groupService`;
  }
}
