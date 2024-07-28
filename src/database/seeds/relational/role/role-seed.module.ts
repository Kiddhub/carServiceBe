import { Module } from '@nestjs/common';

import { RoleSeedService } from './role-seed.service';

@Module({
  imports: [],
  providers: [RoleSeedService],
  exports: [RoleSeedService],
})
export class RoleSeedModule {}
