import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../models/User';
import { mockUsers } from 'src/__mocks__/mockUsers';
import { NotFoundException } from '@nestjs/common';

@Resolver()
export class AuthResolver {
  @Mutation(() => User, { name: 'signIn' })
  signIn(@Args('email') email: string, @Args('password') password: string) {
    const user = mockUsers.find((user) => user.email === email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = password === user.hashedPassword;

    if (!isPasswordValid) {
      throw new NotFoundException('Invalid email or password');
    }

    return user;
  }
}
