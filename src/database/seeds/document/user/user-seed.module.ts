import { Module } from '@nestjs/common';
import { UserSeedService } from './user-seed.service';

@Module({
  imports: [
    // MongooseModule.forFeature([
    //   {
    //     name: UserSchemaClass.name,
    //     schema: UserSchema,
    //   },
    // ]),
  ],
  providers: [UserSeedService],
  exports: [UserSeedService],
})
export class UserSeedModule {}
