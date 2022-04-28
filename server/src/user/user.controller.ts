import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRegisterDto } from './dto/user.register.dto';
import { UserLoginDto } from './dto/user.login.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('login')
  async login(@Body() userLoginDto: UserLoginDto): Promise<any> {
    return this.userService.login(userLoginDto);
  }

  @Post('register')
  async register(@Body() userRegisterDTO: UserRegisterDto): Promise<any> {
    return this.userService.register(userRegisterDTO);
  }
}
