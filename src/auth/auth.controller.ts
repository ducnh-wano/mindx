import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('sign-up')
  async signUp(@Body() body) {
    return this.authService.signUp(body);
  }

  @Post('login')
  async login(@Body() body) {
    return this.authService.login(body);
  }

  //Admin will be added to DB manally;
}
