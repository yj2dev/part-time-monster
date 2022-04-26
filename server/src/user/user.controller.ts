import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entities/User';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  root() {
    return 'i will buying canyon bike...!';
  }

  @Get('/exp')
  exp() {
    return this.userService.testRepo();
  }

  @Get('/all')
  async allUser(): Promise<User[]> {
    return this.userService.findAllUser();
  }
}
