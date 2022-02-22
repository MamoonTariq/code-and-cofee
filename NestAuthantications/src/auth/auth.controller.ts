import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/shared/user.service';
import { Payload } from 'src/types/payload';
import { User } from 'src/utils/user.decorator';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authservice: AuthService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  tempAuth(@User() user: any) {
    console.log(user);
    return { auth: 'works' };
  }

  @Post('login')
  async login(@Body() userDTO: LoginDTO) {
    const user = await this.userService.findByLogin(userDTO);
    const payload = {
      username: user.username,
      seller: user.seller,
    };
    const token = await this.authservice.signPayload(payload);
    return { user, token };
  }
  @Post('register')
  async register(@Body() userDTO: RegisterDTO) {
    const user = await this.userService.create(userDTO);

    const payload = {
      username: user.username,
      seller: user.seller,
    };
    const token = await this.authservice.signPayload(payload);
    return { user, token };
  }
}
