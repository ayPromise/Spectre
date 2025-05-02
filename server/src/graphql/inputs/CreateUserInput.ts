import { InputType, Field } from '@nestjs/graphql';
import { UserRole } from 'src/types/User';

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  hashedPassword: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  phone: string;

  @Field()
  role: UserRole;
}
