import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from '../entities/Company';
import { Repository } from 'typeorm';
import { JobPostRepository } from './job-post.repository';
import { JobPostRequestDto } from './dto/job-post.request.dto';
import { User } from '../entities/User';
import { JobPost } from '../entities/JobPost';

@Injectable()
export class JobPostService {
  constructor(private readonly jobPostRepository: JobPostRepository) {}

  async getAllJobPost(): Promise<JobPost[]> {
    return await this.jobPostRepository.getAllJobPost();
  }

  async createJobPost(user: User, jobPostRequestDto: JobPostRequestDto) {
    const result = await this.jobPostRepository.createJobPost(
      user,
      jobPostRequestDto,
    );
  }
}
