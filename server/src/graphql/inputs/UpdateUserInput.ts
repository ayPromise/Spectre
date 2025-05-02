import { InputType, Field } from '@nestjs/graphql';
import { UserRole } from 'src/types/User';

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  email: string;

  @Field()
  hashedPassword: string;

  @Field()
  phone: string;

  @Field({ nullable: true })
  profileImageUrl: string;

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
