import { Field, ObjectType } from '@nestjs/graphql';
import { IUserClient } from '@/../../packages/types/user';
import { User } from './User';

@ObjectType()
export class AuthPayload {
  @Field()
  token: string;

  @Field(() => User)
  user: IUserClient;
}
