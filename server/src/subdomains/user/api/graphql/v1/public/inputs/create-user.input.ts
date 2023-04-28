import { InputType, Field, Int } from '@nestjs/graphql';
import { ICreateUserDto } from 'src/subdomains/user/application/dto/create-user.dto';

@InputType()
export class CreateUserInput implements ICreateUserDto {
  @Field()
  username: string;
}
