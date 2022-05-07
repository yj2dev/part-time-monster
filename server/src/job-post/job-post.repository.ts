import {
  HttpException,
  Injectable,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Column, PrimaryGeneratedColumn, Repository } from 'typeorm';
import { JobPost } from '../entities/JobPost';
import { JobPostSupport } from '../entities/JobPostSupport';
import { JobPostLike } from '../entities/JobPostLike';
import { JobPostRequestDto } from './dto/job-post.request.dto';
import { User } from '../entities/User';

@Injectable()
export class JobPostRepository {
  constructor(
    @InjectRepository(JobPost) private jobPostRepository: Repository<JobPost>,
    @InjectRepository(JobPostSupport)
    private jobPostSupportRepository: Repository<JobPostSupport>,
    @InjectRepository(JobPostLike)
    private jobPostLikeRepository: Repository<JobPostLike>,
  ) {}

  async createSupport(
    userId: string,
    postId: number,
    content: string,
  ): Promise<JobPostSupport> {
    const result = this.jobPostSupportRepository.save({
      fromUserId: userId,
      toJobPostId: postId,
      content,
    });
    return result;
  }

  async duplicateLike(userId: string, postId: number) {
    const result = this.jobPostRepository.findOne(postId);
    return result;
  }

  async createLike(userId: string, postId: number): Promise<JobPostLike> {
    const result = await this.jobPostLikeRepository.save({
      fromUserId: userId,
      toJobPostId: postId,
    });
    return result;
  }

  async deleteLike(userId: string, postId: number): Promise<void> {
    const result = await this.jobPostLikeRepository.delete({
      fromUserId: userId,
      toJobPostId: postId,
    });
    console.log('deleteLike result >> ', result);
    // return result;
  }

  async getOnceJobPost(postId: string): Promise<JobPost> {
    const result = this.jobPostRepository.findOne(postId);
    return result;
  }

  async getAllJobPost(): Promise<JobPost[]> {
    const result = this.jobPostRepository.find();
    return result;
  }

  async createJobPost(user: User, jobPostRequestDto: JobPostRequestDto) {
    if (!user.isCompany) {
      throw new HttpException('잘못된 접근입니다.', 401);
    }
    const result = await this.jobPostRepository.save({
      fromUserId: user.id,
      fromCompanyId: user.toCompanyId,
      workingPeriod: jobPostRequestDto.workingPeriod,
      workingDay: jobPostRequestDto.workingDay,
      workingStartTime: jobPostRequestDto.workingStartTime,
      workingEndTime: jobPostRequestDto.workingEndTime,
      pay: jobPostRequestDto.pay,
      payType: jobPostRequestDto.payType,
      sex: jobPostRequestDto.sex,
      age: jobPostRequestDto.age,
      education: jobPostRequestDto.education,
      recruitNumber: jobPostRequestDto.recruitNumber,
      recruitStartAt: jobPostRequestDto.recruitStartAt,
      recruitEndAt: jobPostRequestDto.recruitEndAt,
      title: jobPostRequestDto.title,
      content: jobPostRequestDto['description'],
    });
    console.log('createJobPost result >> ', result);
    return result;
  }
}
