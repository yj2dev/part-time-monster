import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from '../entities/User';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRegisterDto } from './dto/user.register.dto';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from './dto/user.login.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async updatePassword(): Promise<any> {
    return 'updatePassword';
  }

  async login(userLoginDTO: UserLoginDto): Promise<any> {
    console.log('userLoginDTO >> ', userLoginDTO);

    const user = await this.userRepository.findUserById(userLoginDTO.id);
    console.log('user >> ', user);

    // 해당하는 유저가 없을때
    if (!user) {
      console.log('not user');
      throw new HttpException('아이디가 존재하지 않습니다.', 401);
    }

    const comparePassword = await bcrypt.compare(
      userLoginDTO.password,
      user.password,
    );

    // 비밀번호가 일치하지 않을때
    if (!comparePassword) {
      console.log('not password');
      throw new HttpException('비밀번호가 일치하지 않습니다.', 401);
    }

    console.log('comparePassword >> ', comparePassword);
  }

  async register(userRegisterDTO: UserRegisterDto): Promise<any> {
    const user = await this.userRepository.findUserById(userRegisterDTO.id);
    console.log('user >> ', user);

    if (user) {
      throw new UnauthorizedException('이미 존재하는 사용자입니다.');
    }

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(userRegisterDTO.password, 10);

    // const encryptPassword = await bcrypt.compareP();
    console.log('hashedPassword >> ', hashedPassword);

    console.log('userRegisterDTO >> ', userRegisterDTO);

    // const comparePassword = await bcrypt.compare(
    //   userRegisterDTO.password,
    //   hashedPassword,
    // );

    userRegisterDTO.password = hashedPassword;

    console.log('userRegisterDTO >> ', userRegisterDTO);

    // userRegisterDTO.password = hashedPassword;
    // console.log('hashedPassword >> ', hashedPassword);

    await this.userRepository.createUser(userRegisterDTO);
  }
}
