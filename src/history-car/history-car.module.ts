import { Module } from '@nestjs/common';
import { HistoryCarService } from './history-car.service';
import { HistoryCarController } from './history-car.controller';
import { HistoryCar } from './entities/history-car.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([HistoryCar])],
  controllers: [HistoryCarController],
  providers: [HistoryCarService],
  exports: [HistoryCarService],
})
export class HistoryCarModule {}
