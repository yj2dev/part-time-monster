import {
  Body,
  Controller,
  Get,
  HttpException,
  Patch,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserRegisterDto } from './dto/user.register.dto';
import { UserLoginDto } from './dto/user.login.dto';
import { HttpExceptionFilter } from '../http-exception.filter';
import { LoggedInGuard } from '../auth/logged-in.guard';
import { NotLoggedInGuard } from '../auth/not-logged-in-guard';

@UseFilters(HttpExceptionFilter)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 모든 유저 조회
  @UseGuards(new LoggedInGuard())
  @Get('all')
  getAllUser() {
    return 'nobody...';
  }

  // 비밀번호 변경
  @Patch('password')
  async updatePassword(@Body() userLoginDto: UserLoginDto): Promise<any> {
    return this.userService.login(userLoginDto);
  }

  // 로그인
  @Get('login')
  async login(@Body() userLoginDto: UserLoginDto): Promise<any> {
    return await this.userService.login(userLoginDto);
  }

  // 회원가입
  @UseGuards(new NotLoggedInGuard())
  @Post('register')
  async register(@Body() userRegisterDTO: UserRegisterDto): Promise<any> {
    return this.userService.register(userRegisterDTO);
  }
}
