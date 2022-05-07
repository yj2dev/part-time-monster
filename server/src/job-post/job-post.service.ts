import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from '../entities/Company';
import { Repository } from 'typeorm';
import { JobPostRepository } from './job-post.repository';
import { JobPostRequestDto } from './dto/job-post.request.dto';
import { User } from '../entities/User';
import { JobPost } from '../entities/JobPost';
import { JobPostSupport } from '../entities/JobPostSupport';
import { JobPostLike } from '../entities/JobPostLike';

@Injectable()
export class JobPostService {
  constructor(private readonly jobPostRepository: JobPostRepository) {}

  async createSupport(
    userId: string,
    postId: number,
    content: string,
  ): Promise<JobPostSupport> {
    return await this.jobPostRepository.createSupport(userId, postId, content);
  }

  async addLike(user: User, postId: string): Promise<JobPostLike> {
    const isLike = await this.jobPostRepository.duplicateLike(
      user.id,
      parseInt(postId),
    );

    console.log('isLike >> ', isLike);

    let likeResult = null;
    // 이미 즐겨찾는 게시물로 등록 했는지 확인
    if (isLike) {
      //  즐겨찾는 게시물 추가
      likeResult = await this.jobPostRepository.createLike(
        postId,
        parseInt(postId),
      );
    } else {
      //  즐겨찾는 게시물 제거
      likeResult = await this.jobPostRepository.createLike(
        postId,
        parseInt(postId),
      );
    }

    console.log('likeResult >> ', likeResult);

    return likeResult;
  }

  async getDetailJobPost(postId: string): Promise<JobPost> {
    return await this.jobPostRepository.getOnceJobPost(postId);
  }

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
