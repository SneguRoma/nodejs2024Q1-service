import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(
    login: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByUsername(login);
    console.log('user', user);
    if (!user || user?.password !== password) {
      throw new HttpException('wrong login or password', HttpStatus.FORBIDDEN);
    }
    if (user) {
      const payload = { sub: user.id, login: user.login };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
  }
}
