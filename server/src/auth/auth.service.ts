import { Injectable, ConflictException, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

import { UserRole } from '@shared/types';
import { RegisterUserDto } from './dto/register-user.dto';
import { User, UserDocument } from './schemas/user';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
      private jwtService: JwtService,
      private configService: ConfigService,

  ) {}

    async createUser(dto: RegisterUserDto) {
    const { email, password, ...rest } = dto;
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) throw new ConflictException('Email already in use');
  
    const saltRounds =  Number(this.configService.get<string>('SALT_ROUNDS'));
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
        
    try {
      const user = await new this.userModel({
        email,
        password: hashedPassword,
        role: UserRole.Student,
        avatarURL: '',
        completedArticles: [],
        completedVideos: [],
        certificates: [],
        achievements: [],
        lastLogin: new Date(),
        ...rest,
      }).save();
  
      return this.generateToken(user);
    } catch (err) {
      if (err.code === 11000) {
        const duplicateField = Object.keys(err.keyPattern)[0];
        throw new ConflictException(`${duplicateField} already in use`);
      }
        throw new InternalServerErrorException('Something went wrong ;( (Unexpected error)');
    }
  }

  async signIn(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    return this.generateToken(user);
  }

  generateToken(user: UserDocument ) {
    return {
      access_token: this.jwtService.sign({ sub: user._id, email: user.email, role:user.role }),
    };
  }
}
