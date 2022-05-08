import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Patch,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { UserService } from './user.service';
import { UserRegisterDto } from './dto/user.register.dto';
import { UserLoginDto } from './dto/user.login.dto';
import { HttpExceptionFilter } from '../http-exception.filter';
import { User } from '../entities/User';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { GetUser } from '../common/get-user';
import { SuccessInterceptor } from '../common/interceptor/success.interceptor';

@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
@Controller('api/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  // 회원탈퇴
  @Delete('account')
  @UseGuards(JwtAuthGuard)
  async deleteAccount(
    @GetUser() loginUser,
    @Body('id') id: string,
    @Body('password') password: string,
    @Body('isCompany') isCompany: number,
  ): Promise<any> {
    const isUser: User = await this.authService.signin(id, password, isCompany);
    console.log('loginUser >> ', loginUser);
    console.log('isUser >> ', isUser);

    // 쿠키에 저장된 유저와 입력된 계정이 동일한지 확인
    if (isUser && isUser.id === loginUser.id) {
      //회원탈퇴 진행
      return await this.userService.deleteAccount(id);
    } else {
      throw new UnauthorizedException('회원정보가 일치하지 않습니다.');
    }
  }

  // 개인정보 수정
  @Patch('info')
  @UseGuards(JwtAuthGuard)
  async updateUserInfo(@GetUser() user, @Body() updateField) {
    return await this.userService.updateUserInfo(user.id, updateField);
  }

  // 로그인 정보 확인
  @UseGuards(JwtAuthGuard)
  @Get('auth')
  auth(@GetUser() user) {
    return user;
  }

  // 비밀번호 변경
  @Patch('password')
  @UseGuards(JwtAuthGuard)
  async updatePassword(
    @GetUser() user: User,
    @Body('currentPassword') currentPassword: string,
    @Body('updatePassword') updatePassword: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    const result = await this.authService.jwtCheckAccount(
      user.id,
      currentPassword,
      updatePassword,
    );
    console.log('update password result >> ', result);
    if (!result) {
      throw new UnauthorizedException('비밀번호 변경에 실패했습니다.');
    }
    res.clearCookie('jwt');
  }

  // 로그인
  @Post('login')
  async login(
    @Body('id') id: string,
    @Body('password') password: string,
    @Body('isCompany') isCompany: number,
    // @Body() userLoginDto: UserLoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    console.log(id, password, isCompany);

    const { jwt, user } = await this.authService.jwtSignin(
      id,
      password,
      isCompany,
    );
    res.cookie('jwt', jwt);
  }

  // 로그아웃
  @Get('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt');
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
