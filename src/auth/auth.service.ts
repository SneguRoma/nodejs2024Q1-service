import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/LoginDto.dto';
import 'dotenv/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(
    login: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.usersService.findOneByUsername(login);
    console.log('user', user);
    if (!user || user?.password !== password) {
      throw new HttpException('wrong login or password', HttpStatus.FORBIDDEN);
    }
    if (user) {
      const payload = { sub: user.id, login: user.login };
      const accessToken = await this.jwtService.signAsync(payload);
      const refreshToken = await this.jwtService.signAsync(payload, {
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });
      return {
        accessToken,
        refreshToken,
      };
    }
  }

  async signup(signupDto: LoginDto) {
    const user = await this.usersService.create({
      login: signupDto.login,
      password: signupDto.password,
    });
    return user;
  }

  async refresh(
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    if (!refreshToken) {
      throw new HttpException(
        'Refresh token is missing',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const user = await this.jwtService.verifyAsync(refreshToken);

      const payload = { sub: user.sub, login: user.login };

      const accessToken = await this.jwtService.signAsync(payload);
      const newRefreshToken = await this.jwtService.signAsync(payload, {
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });

      return { accessToken, refreshToken: newRefreshToken };
    } catch (error) {
      throw new HttpException(
        'Invalid or expired refresh token',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
