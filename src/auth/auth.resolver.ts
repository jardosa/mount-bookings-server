import { LocalAuthGuard } from './guards/local-auth.guard';
import { GqlAuthGuard } from './guards/gqlAuth.guard';
import { UsersService } from './../users/users.service';
import { LoginInput } from './dto/login.input';
import { AuthService } from './auth.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { CurrentUser } from './decorators/currentUser.decorator';
import { UseGuards } from '@nestjs/common';
import { Auth } from './entities/auth.entity';
import { AuthenticationError } from 'apollo-server-errors';

@Resolver(() => User)
export class AuthResolver {
  // eslint-disable-next-line prettier/prettier
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Mutation(() => Auth)
  // eslint-disable-next-line prettier/prettier
  async login(@Args('loginInput') loginInput: LoginInput): Promise<Auth> {
    const { email, password } = loginInput;

    const auth_token = await this.authService.login(loginInput);

    if (auth_token) {
      return auth_token;
    }
    throw new AuthenticationError('Unauthenticated user');
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async whoAmI(@CurrentUser() user: User) {
    return this.userService.findOneById(user._id);
  }
}
