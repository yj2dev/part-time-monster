import { PickType } from '@nestjs/swagger';
import { User } from '../../entities/User';

export class UserRegisterDto extends PickType(User, [
  'id',
  'password',
] as const) {}
