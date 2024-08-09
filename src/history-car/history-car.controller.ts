import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HistoryCarService } from './history-car.service';
import { CreateHistoryCarDto } from './dto/create-history-car.dto';
import { UpdateHistoryCarDto } from './dto/update-history-car.dto';

@Controller('history-car')
export class HistoryCarController {
  constructor(private readonly historyCarService: HistoryCarService) {}

  @Post()
  create(@Body() createHistoryCarDto: CreateHistoryCarDto) {
    return this.historyCarService.create(createHistoryCarDto);
  }

  @Get()
  findAll() {
    return this.historyCarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historyCarService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistoryCarDto: UpdateHistoryCarDto) {
    return this.historyCarService.update(+id, updateHistoryCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historyCarService.remove(+id);
  }
}
