import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/User';
import { Repository } from 'typeorm';
import { UserRegisterDto } from './dto/user.register.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {} //

  async updatePassword(id, password) {
    const result = await this.userRepository.update(id, password);
    console.log('updatePassword result >> ', result);
    return result;
  }

  async createUser(userRegisterDTO: UserRegisterDto): Promise<any> {
    console.log('userRegisterDTO >> ', userRegisterDTO);
    const result = await this.userRepository.save({
      ...userRegisterDTO,
    });

    console.log('createUser result >> ', result);
    return result;
  }

  async findUserById(id: string): Promise<User> {
    const result = await this.userRepository.findOne({ where: { id } });
    return result;
  }
}
