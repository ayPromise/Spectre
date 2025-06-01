import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('create-user')
  async signUp(@Body() dto: RegisterUserDto) {
    return this.authService.createUser(dto);
  }

  @Post('sign-in')
  async signIn(
    @Body('email') email: string,
    @Body('password') password: string
  ) {
    return this.authService.signIn(email, password);
  }
}
