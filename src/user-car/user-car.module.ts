import { Module } from '@nestjs/common';
import { UserCarService } from './user-car.service';
import { UserCarController } from './user-car.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCar } from './entities/user-car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserCar])],
  controllers: [UserCarController],
  providers: [UserCarService],
})
export class UserCarModule {}
