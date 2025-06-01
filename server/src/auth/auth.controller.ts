import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { Response } from "express";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('create-user')
  async signUp(@Body() dto: RegisterUserDto) {
    return this.authService.createUser(dto);
  }

  @Post('sign-in')
  async signIn(@Res({ passthrough: true }) res: Response, @Body() body: { email: string; password: string }) {

    const token = await this.authService.signIn(body.email, body.password);

    res.cookie('token', token.access_token, {
      httpOnly: true,
      secure: false, // 👉 true на проді з HTTPS
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  
    return { message: 'Ласкаво просимо!' };
  }
}
