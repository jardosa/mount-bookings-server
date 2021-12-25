import { AuthenticationError } from 'apollo-server-errors';
import { User as UserEntity } from 'src/users/entities/user.entity';
import { User, UserDocument } from './../users/schemas/users.schema';
import { LoginInput } from './dto/login.input';
import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<UserDocument> {
    const user = await this.usersService.findOne(email);

    if (user && user.password == pass) {
      return user;
    }

    return null;
  }

  async login(loginInput: LoginInput) {
    const { email, password } = loginInput;
    const user = await this.usersService.findOne(email);

    if (user && user.password == password) {
      const payload = { username: user.email, _id: user._id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }

    throw new AuthenticationError('ERROR');
  }
}
