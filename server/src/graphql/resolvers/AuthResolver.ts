import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { mockUsers } from 'src/__mocks__/mockUsers';
import { NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload } from '../models/AuthPayload';

@Resolver()
export class AuthResolver {
  constructor(private readonly jwtService: JwtService) {}
  @Mutation(() => AuthPayload, { name: 'signIn' })
  signIn(@Args('email') email: string, @Args('password') password: string) {
    const user = mockUsers.find((user) => user.email === email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = password === user.hashedPassword;

    if (!isPasswordValid) {
      throw new NotFoundException('Invalid email or password');
    }

    const infoUserData = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      role: user.role,
      profileImageUrl: user.profileImageUrl,
    };

    const token = this.jwtService.sign({ sub: user.id, role: user.role });

    return {
      token,
      user: infoUserData,
    };
  }
}
