import {
  HttpException,
  Injectable,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Column,
  DeleteResult,
  getRepository,
  Like,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm';
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

  // 게시물번호(아이디)로 채용게시물 삭제
  async deletePost(postId: number): Promise<DeleteResult> {
    console.log('deletePost postId >> ', postId);
    const result = await this.jobPostRepository.delete({
      id: postId,
    });
    console.log('deletePost result >> ', result);
    return result;
  }

  // 유저 아이디로 등록한 채용 게시물들 조회
  async findPostById(userId: string): Promise<any> {
    console.log('userId >> ', userId);

    const result = await this.jobPostRepository.find({
      where: { fromUserId: userId },
      relations: ['jobPostSupports'],
      order: {
        createdAt: 'DESC',
      },
    });

    console.log('result >> ', result);

    return result;
  }

  // 유저 아이디로 즐겨찾는 게시물 조회
  async findFavoriteById(userId: string): Promise<JobPostLike[]> {
    const result = await this.jobPostLikeRepository.find({
      fromUserId: userId,
    });
    return result;
  }

  // 유저 아이디로 지원한 채용게시물 조회
  async findSupportPostById(userId: string): Promise<JobPostSupport[]> {
    const result = this.jobPostSupportRepository.find({
      where: {
        fromUserId: userId,
      },
      order: {
        createdAt: 'DESC',
      },
    });
    return result;
  }

  // 지원번호(아이디)로 지원한 채용게시물 삭제
  async deleteSupport(supportId: number): Promise<DeleteResult> {
    const result = await this.jobPostSupportRepository.delete({
      id: supportId,
    });
    return result;
  }

  // 유저 아이디로 지원한 채용게시물 수정
  async updateSupport(supportId: number, content): Promise<JobPostSupport> {
    const result = await this.jobPostSupportRepository.save({
      id: supportId,
      content,
    });
    return result;
  }

  // 단어로 알바 검색
  async findByKeyword(keyword): Promise<JobPost[] | undefined> {
    const result = this.jobPostRepository.find({
      title: Like(`%${keyword}%`),
    });
    return result;
  }

  // 채용 게시물에 지원
  async createSupport(
    userId: string,
    postId: number,
    content: string,
  ): Promise<JobPostSupport> {
    const result = await this.jobPostSupportRepository.save({
      fromUserId: userId,
      toJobPostId: postId,
      content,
    });
    return result;
  }

  // 이미 즐겨찾는 게시물로 등록되어 있는지 학인
  async duplicateLike(
    userId: string,
    postId: number,
  ): Promise<JobPostLike | undefined> {
    const result = await this.jobPostLikeRepository.findOne({
      fromUserId: userId,
      toJobPostId: postId,
    });
    return result;
  }

  // 즐겨찾는 게시물추가
  async createLike(userId: string, postId: number): Promise<JobPostLike> {
    const result = await this.jobPostLikeRepository.save({
      fromUserId: userId,
      toJobPostId: postId,
    });
    return result;
  }

  // 즐겨찾는 게시물 제거
  async deleteLike(userId: string, postId: number): Promise<void> {
    const result = await this.jobPostLikeRepository.delete({
      fromUserId: userId,
      toJobPostId: postId,
    });
    console.log('deleteLike result >> ', result);
    // return result;
  }

  // 하나의 채용 게시물만 조회
  async getOnceJobPost(postId: string): Promise<JobPost> {
    const result = this.jobPostRepository.findOne(postId);
    return result;
  }

  // 모든 채용 게시물 조회
  async getAllJobPost(): Promise<JobPost[]> {
    const result = this.jobPostRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
    return result;
  }

  // 채용 게시물 등록
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
