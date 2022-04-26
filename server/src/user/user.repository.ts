import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {} //

  testRepo() {
    console.log('tR...');
    return 'testRepo';
  }

  async findAll(): Promise<User[]> {
    console.log('find all user...');
    const result = await this.userRepository.find();
    console.log('findAll result >> ', result);
    return result;
  }
}
