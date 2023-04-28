import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { User } from '../../domain/entities/user';
import { ICreateUserDto } from '../dto/create-user.dto';
import { UserFactory } from '../factories/user.factory';
import {
  UserRepository,
  USER_REPOSITORY,
} from '../repositories/user.repository';
import { Utils } from 'src/shared/utils/utils';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: UserRepository,
  ) {}

  //*** PUBLIC API ***//

  async getUserById(userId: string): Promise<User> {
    const user = await this.userRepository.loadById(userId);
    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async createUser(dto: ICreateUserDto): Promise<User> {
    const newUser = UserFactory.create(dto);

    return await this.userRepository.save(newUser);
  }
}
