import { Field, ObjectType } from '@nestjs/graphql';
import { UserRole } from 'src/types/User';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field({ nullable: true })
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

  @Field({ nullable: true })
  profileImageUrl: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  lastLogin: Date;

  @Field(() => [String])
  completedArticles: string[];

  @Field(() => [String])
  completedLectures: string[];

  @Field(() => [String])
  completedVideos: string[];

  @Field(() => [String])
  certificates: string[];
}
