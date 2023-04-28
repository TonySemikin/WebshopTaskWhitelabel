import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CategorySchema {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;
}
