import {
  Body,
  Controller,
  Get,
  HttpException,
  Patch,
  Post,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { UserRegisterDto } from './dto/user.register.dto';
import { UserLoginDto } from './dto/user.login.dto';
import { HttpExceptionFilter } from '../http-exception.filter';
import { User } from '../entities/User';
import { AuthService } from '../auth/auth.service';

@UseFilters(HttpExceptionFilter)
@Controller('api/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  // 모든 유저 조회
  @Get('all')
  getAllUser() {
    return 'nobody...';
  }

  // 비밀번호 변경
  @Patch('password')
  async updatePassword(@Body() userLoginDto: UserLoginDto): Promise<any> {
    // return this.userService.login(userLoginDto);
    // return this.authService.jwtCheckAccount(userLoginDto);
  }

  // 로그인
  @Post('login')
  async login(
    @Body() userLoginDto: UserLoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    const { jwt, user } = await this.authService.jwtSignin(userLoginDto);
    res.cookie('jwt', jwt);
  }

  // 회원가입
  @Post('register')
  async register(@Body() userRegisterDTO: UserRegisterDto): Promise<any> {
    // async register(@Body() body): Promise<any> {
    //   console.log('body >> ', body);
    console.log('userRegisterDTO >> ', userRegisterDTO);
    return this.userService.register(userRegisterDTO);
  }
}
