import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Query,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserCarService } from './user-car.service';
import { CreateUserCarDto } from './dto/create-user-car.dto';
import { UpdateUserCarDto } from './dto/update-user-car.dto';
import { infinityAndCountPagination } from '../utils/infinity-pagination';
import { QueryUserCarDto } from './dto/query-user-car.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';

@ApiTags('User Car')
@Controller({
  path: 'user-car',
  version: '1',
})
@UseGuards(AuthGuard('jwt'))
export class UserCarController {
  constructor(private readonly userCarService: UserCarService) {}

  @Post()
  @Roles(RoleEnum.User)
  create(@Request() request, @Body() createUserCarDto: CreateUserCarDto) {
    return this.userCarService.create(request.user, createUserCarDto);
  }

  @Get()
  @Roles(RoleEnum.Admin)
  async findAll(@Request() request, @Query() query: QueryUserCarDto) {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }
    return infinityAndCountPagination(
      await this.userCarService.findAll({
        currentUser: request.user,
        filterOptions: query.filters,
        sortOptions: query.sort,
        paginationOptions: { page, limit },
        searchText: query.searchText,
      }),
      { page, limit },
    );
  }

  @Get()
  @Roles(RoleEnum.User)
  async findByUser(@Request() request, @Query() query: QueryUserCarDto) {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }
    return infinityAndCountPagination(
      await this.userCarService.findAll({
        currentUser: request.user,
        filterOptions: query.filters,
        sortOptions: query.sort,
        paginationOptions: { page, limit },
        searchText: query.searchText,
      }),
      { page, limit },
    );
  }

  @Get(':id')
  findOne(@Request() request, @Param('id') id: number) {
    return this.userCarService.findOne(request.user, id);
  }

  @Put(':id')
  @Roles(RoleEnum.User)
  update(@Param('id') id: number, @Body() updateUserCarDto: UpdateUserCarDto) {
    return this.userCarService.update(id, updateUserCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userCarService.remove(+id);
  }
}
