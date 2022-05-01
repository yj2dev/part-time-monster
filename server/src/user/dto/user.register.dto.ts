import { OmitType, PickType } from '@nestjs/swagger';
import { User } from '../../entities/User';

export class UserRegisterDto extends OmitType(User, [] as const) {}
