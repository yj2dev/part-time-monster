import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from '../entities/User';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) // @InjectRepository(User) private userRepository: Repository<User>,
  {}

  async testRepo() {
    const result = await this.userRepository.testRepo();
    console.log('result >> ', result);

    return result;
    // return this.userRepository.testRepo();
  }

  async findAllUser(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}
