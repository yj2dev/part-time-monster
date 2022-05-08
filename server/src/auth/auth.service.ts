import {
  BadRequestException,
  HttpException,
  Injectable,
  UnauthorizedException,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { UserLoginDto } from '../user/dto/user.login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { request } from 'express';
import { HttpExceptionFilter } from '../http-exception.filter';
import { SuccessInterceptor } from '../common/interceptor/success.interceptor';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  // 계정 확인(비밀번호 변경시 사용)
  // userId: 변경 대상, currentPassword: 현재 비밀번호, password: 변경할 비밀번호
  async jwtCheckAccount(
    userId: string,
    currentPassword: string,
    password: string,
  ) {
    if (!userId || !currentPassword || !password) {
      throw new HttpException('비어있는 항목이 있습니다.', 401);
    }
    console.log('userId >> ', userId);
    console.log('currentPassword >> ', currentPassword);
    console.log('password >> ', password);

    const isUser = await this.userRepository.findUserById(userId);
    console.log('isUser >> ', isUser);

    // 유저가 존재하지 않다면 오류 발생
    if (!isUser) throw new UnauthorizedException('유저가 존재하지 않습니다.');

    const isPassword: boolean = await bcrypt.compare(
      currentPassword,
      isUser.password,
    );

    console.log('isPassword >> ', isPassword);

    // 현재 비밀번호 확인
    if (!isPassword)
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');

    // 변경할 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('hashedPassword >> ', hashedPassword);

    // 비밀번호 저장
    const passwordSaveResult = await this.userRepository.updatePassword(
      isUser.id,
      hashedPassword,
    );

    console.log('passwordSaveResult >> ', passwordSaveResult);
    return true;
  }

  // 로그인
  async jwtSignin(id, password, isCompany) {
    // 해당하는 유저가 존재하는지 확인
    const user = await this.userRepository.findUserById(id);

    console.log('user >> ', user);

    if (!user) {
      throw new UnauthorizedException('유저가 존재하지 않습니다.');
    }

    // 회원유형에 맞게 로그인 시도했는지 확인
    // 개인회원 확인
    if (!isCompany && isCompany !== user.isCompany)
      throw new UnauthorizedException('회원유형이 맞지 않습니다.');
    if (isCompany && isCompany !== user.isCompany)
      throw new UnauthorizedException('회원유형이 맞지 않습니다.');

    // 기업회원 확인

    // 비밀번호 또한 일치하는지 확인
    const isPassword: boolean = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    try {
      // sub: token의 제목
      const jwt = this.jwtService.sign(
        { sub: user.id },
        { secret: process.env.JWT_SECRET },
      );

      return { jwt, user };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
