import { HttpException, Injectable } from '@nestjs/common';
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
        const groupService = await manager.findOne(GroupService, {
          where: { key: createGroupServiceDto.key },
        });
        if (groupService !== null) {
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
            'An error occurred while creating group service:' +
              error.response?.errors,
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
        } else if (updateGroupServiceDto.key) {
          const groupServiceKey = await manager.findOne(GroupService, {
            where: { key: updateGroupServiceDto.key },
          });
          if (groupServiceKey && groupServiceKey.id !== id) {
            throw new HttpException(
              {
                errors: {
                  key: 'Key already exists',
                },
              },
              400,
            );
          }
        } else {
          manager.merge(GroupService, groupService, updateGroupServiceDto);
          return await manager.save(groupService);
        }
      } catch (error) {
        if (error instanceof HttpException) {
          throw error;
        } else {
          throw new HttpException(
            {
              errors: {
                message: 'Internal server error',
              },
            },
            500,
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
      'group_service',
    );
    console.log('filterOptions', filterOptions);
    if (filterOptions?.key) {
      queryBuilder.where('group_service.key = :key', {
        key: filterOptions.key,
      });
    } else if (filterOptions?.status) {
      queryBuilder.where('group_service.status = :status', {
        status: filterOptions.status,
      });
    }
    // Search
    if (searchText) {
      queryBuilder.where('group_service.key LIKE :searchText', {
        searchText: `%${searchText.toUpperCase()}%`,
      });
    }

    // Sort
    if (sortOptions && sortOptions.length > 0) {
      sortOptions.forEach((sort: any) => {
        if (sort.orderBy && sort.order) {
          queryBuilder.orderBy(
            `group_service.${sort.orderBy}`,
            sort.order.toUpperCase() as 'ASC' | 'DESC',
          );
        }
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
