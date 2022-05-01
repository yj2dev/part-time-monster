import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/User';
import { UserRepository } from './user.repository';
import { Company } from '../entities/Company';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Company]), AuthModule],
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [UserRepository],
})
export class UserModule {}
