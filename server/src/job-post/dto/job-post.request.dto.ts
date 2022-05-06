import { OmitType } from '@nestjs/swagger';
import { JobPost } from '../../entities/JobPost';

export class JobPostRequestDto extends OmitType(JobPost, [] as const) {}
