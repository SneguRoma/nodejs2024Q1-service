import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/LoginDto.dto';
import { RefreshDto } from './dto/RefreshDto.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

  /* @Post('signup')
  async signup(@Body() signupDto: LoginDto) {
    return this.authService.signup(signupDto);
  } */

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    /* if (!isValidUUID) {
        throw new HttpException(
          `The provided ID (${id}) is not a valid UUID`,
          HttpStatus.BAD_REQUEST,
        );
      } */
    return this.authService.login(loginDto.login, loginDto.password);
  }

   /*@Post('refresh')
  async refresh(@Body() refreshDto: RefreshDto) {
    return this.authService.refresh(refreshDto);
  } */
}
