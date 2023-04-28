import { Repository } from 'src/shared/repositories/repository';
import { User } from '../../domain/entities/user';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface UserRepository extends Repository<User> {}
