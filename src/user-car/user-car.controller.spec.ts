import { Test, TestingModule } from '@nestjs/testing';
import { UserCarController } from './user-car.controller';
import { UserCarService } from './user-car.service';

describe('UserCarController', () => {
  let controller: UserCarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCarController],
      providers: [UserCarService],
    }).compile();

    controller = module.get<UserCarController>(UserCarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
