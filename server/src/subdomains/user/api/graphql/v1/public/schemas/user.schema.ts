import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserSchema {
  @Field()
  id: string;

  @Field()
  username: string;
}
