import { User } from '../../domain/entities/user';
import { ICreateUserDto } from '../dto/create-user.dto';

export class UserFactory {
  static create({ username }: ICreateUserDto): User {
    return new User(null, new Date(), new Date(), username);
  }
}
