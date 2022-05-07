import { HttpException, Injectable } from '@nestjs/common';
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

  async searchByKeyword(keyword: string) {
    return await this.jobPostRepository.findByKeyword(keyword);
  }

  async createSupport(
    userId: string,
    postId: number,
    content: string,
  ): Promise<JobPostSupport> {
    return await this.jobPostRepository.createSupport(userId, postId, content);
  }

  async checkLike(
    user: User,
    postId: string,
  ): Promise<JobPostLike | undefined> {
    const isLike = await this.jobPostRepository.duplicateLike(
      user.id,
      parseInt(postId),
    );
    return isLike;
  }

  async addLike(user: User, postId: string): Promise<JobPostLike> {
    console.log(user.id, postId);

    const isLike = await this.jobPostRepository.duplicateLike(
      user.id,
      parseInt(postId),
    );

    console.log('isLike >> ', isLike);

    let likeResult = null;

    // 이미 즐겨찾는 게시물로 등록 했는지 확인
    if (!isLike) {
      //  즐겨찾는 게시물 추가
      likeResult = await this.jobPostRepository.createLike(
        user.id,
        parseInt(postId),
      );
    } else {
      //  즐겨찾는 게시물 제거
      likeResult = await this.jobPostRepository.deleteLike(
        user.id,
        parseInt(postId),
      );
    }

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
