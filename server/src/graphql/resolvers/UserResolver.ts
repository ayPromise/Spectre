import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '../models/User';
import { mockUsers } from 'src/__mocks__/mockUsers';
import { CreateUserInput } from '../inputs/CreateUserInput';
import { UpdateUserInput } from '../inputs/UpdateUserInput';
import { NotFoundException } from '@nestjs/common';

@Resolver()
export class UserResolver {
  @Query((returns) => User, { nullable: true, name: 'userById' })
  getUserById(@Args('id') id: string) {
    return mockUsers.find((user) => user.id === id);
  }

  @Query((returns) => [User], { name: 'allUsers' })
  getAllUsers() {
    return mockUsers;
  }

  @Mutation((returns) => User, { name: 'newUser' })
  createUser(@Args('input') input: CreateUserInput): User {
    const basicUserInfo = {
      id: 'mock-id-123',
      profileImageUrl: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastLogin: null,
      completedArticles: [],
      completedLectures: [],
      completedVideos: [],
      certificates: [],
    };

    const newUser = { ...basicUserInfo, ...input } as User;
    mockUsers.push(newUser);
    return newUser;
  }

  @Mutation((returns) => User, { name: 'updateUser' })
  updateUserById(
    @Args('id') id: string,
    @Args('input') input: UpdateUserInput,
  ): User {
    const userIndex = mockUsers.findIndex((user) => user.id === id);
    if (userIndex === -1) throw new NotFoundException();

    const userById = mockUsers[userIndex];

    const updatedUser: User = {
      ...userById,
      ...input,
      updatedAt: new Date(),
    };
    mockUsers[userIndex] = updatedUser;
    return updatedUser;
  }
}
