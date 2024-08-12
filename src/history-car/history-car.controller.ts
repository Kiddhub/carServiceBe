import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Request,
  Query,
  UseGuards,
} from '@nestjs/common';
import { HistoryCarService } from './history-car.service';
import { CreateHistoryCarDto } from './dto/create-history-car.dto';
import { UpdateHistoryCarDto } from './dto/update-history-car.dto';
import { QueryHistoryCarDto } from './dto/query-history-car.dto';
import { infinityAndCountPagination } from '../utils/infinity-pagination';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';

@ApiTags('History Car')
@Controller({
  path: 'history-car',
  version: '1',
})
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class HistoryCarController {
  constructor(private readonly historyCarService: HistoryCarService) {}

  @Post()
  @Roles(RoleEnum.User)
  create(@Request() request, @Body() createHistoryCarDto: CreateHistoryCarDto) {
    return this.historyCarService.checkIn(request.user, createHistoryCarDto);
  }

  @Get()
  @Roles(RoleEnum.Admin)
  async findAll(@Query() query: QueryHistoryCarDto) {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }
    return infinityAndCountPagination(
      await this.historyCarService.findAll({
        filterOptions: query.filters,
        sortOptions: query.sort,
        paginationOptions: { page, limit },
        searchText: query.searchText,
      }),
      { page, limit },
    );
  }
  @Put()
  @Roles(RoleEnum.User)
  update(@Request() request, @Body() updateHistoryCarDto: UpdateHistoryCarDto) {
    return this.historyCarService.checkOut(request.user, updateHistoryCarDto);
  }

  @Get('user')
  @Roles(RoleEnum.User)
  async findByUser(@Request() request, @Query() query: QueryHistoryCarDto) {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }
    return infinityAndCountPagination(
      await this.historyCarService.findByUser({
        currentUser: request.user,
        filterOptions: query.filters,
        sortOptions: query.sort,
        paginationOptions: { page, limit },
        searchText: query.searchText,
      }),
      { page, limit },
    );
  }
}
