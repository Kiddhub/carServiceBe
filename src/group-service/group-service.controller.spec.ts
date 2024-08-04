import { Test, TestingModule } from '@nestjs/testing';
import { GroupServiceController } from './group-service.controller';
import { GroupServiceService } from './group-service.service';

describe('GroupServiceController', () => {
  let controller: GroupServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupServiceController],
      providers: [GroupServiceService],
    }).compile();

    controller = module.get<GroupServiceController>(GroupServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
