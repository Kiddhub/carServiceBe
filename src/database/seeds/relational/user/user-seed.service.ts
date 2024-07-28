import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { User } from '../../../../users/entities/user.entity';

@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  // async run() {
  //   const countAdmin = await this.repository.count({
  //     where: {
  //       role: {
  //         id: RoleEnum.Admin,
  //       },
  //     },
  //   });

  //   if (!countAdmin) {
  //     const salt = await bcrypt.genSalt();
  //     const password = await bcrypt.hash('secret', salt);

  //     await this.repository.save(
  //       this.repository.create({
  //         firstName: 'Super',
  //         lastName: 'Admin',
  //         email: 'admin@example.com',
  //         password,
  //         role: {
  //           id: RoleEnum.Admin,
  //           name: 'Admin',
  //         },
  //         status: {
  //           id: StatusEnum.active,
  //           name: 'Active',
  //         },
  //       }),
  //     );
  //   }

  //   const countUser = await this.repository.count({
  //     where: {
  //       role: {
  //         id: RoleEnum.User,
  //       },
  //     },
  //   });

  //   if (!countUser) {
  //     const salt = await bcrypt.genSalt();
  //     const password = await bcrypt.hash('secret', salt);

  //     await this.repository.save(
  //       this.repository.create({
  //         name: 'John',
  //         email: 'john.doe@example.com',
  //         password,
  //         role: {
  //           id: RoleEnum.User,
  //           name: 'Admin',
  //         },
  //         status: {
  //           id: StatusEnum.active,
  //           name: 'Active',
  //         },
  //       }),
  //     );
  //   }
  // }
}
