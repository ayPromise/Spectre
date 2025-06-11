import {
  Controller,
  Post,
  Body,
  Res,
  UseGuards,
  Get,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { Response } from 'express';
import { Roles } from 'src/decorators/roles.decorator';
import { User, UserRole } from '@shared/types';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { NotAuthenticatedGuard } from 'src/guards/not-authenticated.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('create-user')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin, UserRole.Instructor)
  async createUser(@Body() dto: RegisterUserDto) {
    return this.authService.createUser(dto);
  }

  @Post('sign-in')
  @UseGuards(NotAuthenticatedGuard)
  async signIn(
    @Res({ passthrough: true }) res: Response,
    @Body() body: { email: string; password: string },
  ) {
    const token = await this.authService.signIn(body.email, body.password);

    res.cookie('token', token.access_token, {
      httpOnly: true,
      secure: false, // 👉 true на проді з HTTPS
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { message: 'Ласкаво просимо!' };
  }

  @Post('get-users-by-ids')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin, UserRole.Instructor)
  async getUsersByIds(@Body() body: { ids: string[] }) {
    return this.authService.getUsersByIds(body.ids);
  }

  @Post('complete-article')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin, UserRole.Instructor, UserRole.Student)
  async completeArticle(@Body() body: { articleId: string; userId: string }) {
    return this.authService.completeArticle(body.userId, body.articleId);
  }

  @Post('complete-lecture')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin, UserRole.Instructor, UserRole.Student)
  async completeLecture(@Body() body: { lectureId: string; userId: string }) {
    return this.authService.completeLecture(body.userId, body.lectureId);
  }

  @Post('complete-video')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin, UserRole.Instructor, UserRole.Student)
  async completeVideo(@Body() body: { videoId: string; userId: string }) {
    return this.authService.completeVideo(body.userId, body.videoId);
  }

  @Post('assign-achievements')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin, UserRole.Instructor, UserRole.Student)
  async assignAchievement(
    @Body() body: { achievements: string[]; userId: string },
  ) {
    return this.authService.assignAchievements(body.userId, body.achievements);
  }

  @Get('get-all-users')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin, UserRole.Instructor)
  async getAllUsers() {
    return this.authService.getAllUsers();
  }

  @Delete('delete-user/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin, UserRole.Instructor)
  async deleteUser(@Param('id') id: string) {
    return this.authService.deleteUser(id);
  }

  @Patch('edit-user/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin, UserRole.Instructor)
  async editUser(@Param('id') id: string, @Body() body: Partial<User>) {
    return this.authService.editUser(id, body);
  }
}
