import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { UserCarService } from './user-car.service';
import { CreateUserCarDto } from './dto/create-user-car.dto';
import { UpdateUserCarDto } from './dto/update-user-car.dto';

@Controller('user-car')
export class UserCarController {
  constructor(private readonly userCarService: UserCarService) {}

  @Post()
  create(@Request() request, @Body() createUserCarDto: CreateUserCarDto) {
    return this.userCarService.create(request.user, createUserCarDto);
  }

  @Get()
  findAll() {
    return this.userCarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userCarService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserCarDto: UpdateUserCarDto) {
    return this.userCarService.update(+id, updateUserCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userCarService.remove(+id);
  }
}
