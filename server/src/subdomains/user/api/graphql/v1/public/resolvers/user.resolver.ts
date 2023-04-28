import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from 'src/subdomains/user/application/services/user.service';
import { CreateUserInput } from '../inputs/create-user.input';
import { UserSchema } from '../schemas/user.schema';

@Resolver((of) => UserSchema)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query((returns) => UserSchema)
  async user(@Args('id', { type: () => String }) id: string) {
    return this.userService.getUserById(id);
  }

  @Mutation((returns) => UserSchema)
  async createUser(
    @Args('input', { type: () => CreateUserInput }) input: CreateUserInput,
  ) {
    return this.userService.createUser(input);
  }
}
