import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/User';
import { DeleteResult, Repository } from 'typeorm';
import { UserRegisterDto } from './dto/user.register.dto';
import { Company } from '../entities/Company';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Company) private companyRepository: Repository<Company>,
  ) {} //

  async deleteUser(userId: string): Promise<DeleteResult | undefined> {
    const result = await this.userRepository.delete({ id: userId });
    console.log('deleteUser result >> ', result);
    return result;
  }

  async updateUserWithoutPassword(updateField) {
    console.log('updateField >> ', updateField);

    let result = null;
    if (updateField.isCompany) {
      // 기업정보 변경
      result = await this.companyRepository.save({ ...updateField });
    } else {
      // 개인정보 변경
      result = await this.userRepository.save({ ...updateField });
    }

    console.log('result >> ', result);
    return result;
  }

  async updatePassword(id, password) {
    const result = await this.userRepository.save({
      id,
      password,
    });
    console.log('updatePassword result >> ', result);
    return result;
  }

  async createUser(userRegisterDTO: UserRegisterDto): Promise<any> {
    console.log('userRegisterDTO >> ', userRegisterDTO);

    let result;

    // 기업정보가(기업회원) 있다면 기업정보 저장
    if (userRegisterDTO.isCompany) {
      result = await this.companyRepository.save({
        number: userRegisterDTO['toCompanyId'],
        name: userRegisterDTO['companyName'],
        ceoName: userRegisterDTO['companyCeoName'],
        contact: userRegisterDTO['companyContact'],
        address: userRegisterDTO['companyAddress'],
        size: userRegisterDTO['companySize'],
      });
    }
    console.log('createUser company result >> ', result);

    // 개인회원
    result = await this.userRepository.save({
      ...userRegisterDTO,
    });

    console.log('createUser user result >> ', result);
    return result;
  }

  async findUserById(id: string): Promise<User> {
    const result = await this.userRepository.findOne({ where: { id } });
    return result;
  }
}
