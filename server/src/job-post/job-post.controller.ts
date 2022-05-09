import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { JobPostRequestDto } from './dto/job-post.request.dto';
import { GetUser } from '../common/get-user';
import { JobPostService } from './job-post.service';
import { User } from '../entities/User';
import { HttpExceptionFilter } from '../http-exception.filter';
import { SuccessInterceptor } from '../common/interceptor/success.interceptor';
import { JobPost } from '../entities/JobPost';
import { JobPostLike } from '../entities/JobPostLike';
import { JobPostSupport } from '../entities/JobPostSupport';
import { DeleteResult } from 'typeorm';

@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
@Controller('api/job-post')
export class JobPostController {
  constructor(private readonly jobPostService: JobPostService) {}

  @Patch('/:postId/post')
  @UseGuards(JwtAuthGuard)
  async updateJobPost(
    @Param('postId') postId: string,
    @Body('') jobPostField: JobPost,
  ): Promise<JobPost> {
    console.log('update jobpost >> ', postId, jobPostField);
    return await this.jobPostService.updateJobPost(postId, jobPostField);
  }

  @Delete('/:postId/post')
  @UseGuards(JwtAuthGuard)
  async deleteJobPost(@Param('postId') postId: string): Promise<DeleteResult> {
    console.log('delete postId >> ', postId);
    return await this.jobPostService.deleteJobPost(postId);
  }

  @Get('/wrote-all')
  @UseGuards(JwtAuthGuard)
  async getAllPostByUserId(@GetUser() user: User): Promise<JobPost[]> {
    return await this.jobPostService.getAllPostByUserId(user.id);
  }

  @Delete('/:supportId/support')
  @UseGuards(JwtAuthGuard)
  async deleteSupport(
    @Param('supportId') supportId: string,
  ): Promise<DeleteResult> {
    console.log('delete support >> ', supportId);
    return await this.jobPostService.deleteSupport(supportId);
  }

  @Patch('/:supportId/support')
  @UseGuards(JwtAuthGuard)
  async updateSupport(
    @Param('supportId') supportId: string,
    @Body('content') content: string,
  ): Promise<JobPostSupport> {
    // console.log("update support >> ", supportId, content);
    return await this.jobPostService.updateSupport(supportId, content);
  }

  @Get('/all/support')
  @UseGuards(JwtAuthGuard)
  async getAllSupport(@GetUser() user: User) {
    return await this.jobPostService.findSupportPostById(user.id);
  }

  @Get('/all/favorite')
  @UseGuards(JwtAuthGuard)
  async getAllFavorite(@GetUser() user: User) {
    return await this.jobPostService.findFavoriteById(user.id);
  }

  @Get('/:keyword/search')
  async searchByKeyword(@Param('keyword') keyword: string) {
    return await this.jobPostService.searchByKeyword(keyword);
  }

  @Get('/:postId/favorite-check')
  @UseGuards(JwtAuthGuard)
  async checkLike(
    @GetUser() user: User,
    @Param('postId') postId: string,
  ): Promise<JobPostLike | undefined> {
    return await this.jobPostService.checkLike(user, postId);
  }

  @Post('/:postId/support')
  @UseGuards(JwtAuthGuard)
  async createSupport(
    @GetUser() user: User,
    @Param('postId') postId: number,
    @Body('content') content: string,
  ): Promise<JobPostSupport> {
    console.log('user >> ', user);
    return await this.jobPostService.createSupport(user.id, postId, content);
  }

  @Get('/:postId/favorite')
  @UseGuards(JwtAuthGuard)
  async addLike(
    @GetUser() user: User,
    @Param('postId') postId: string,
  ): Promise<JobPostLike> {
    return await this.jobPostService.addLike(user, postId);
  }

  @Get('/:postId/detail')
  async getDetailJobPost(@Param('postId') postId: string): Promise<JobPost> {
    return await this.jobPostService.getDetailJobPost(postId);
  }

  @Get('all')
  async getAllJobPost(): Promise<JobPost[]> {
    return await this.jobPostService.getAllJobPost();
  }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async createJobPost(
    @GetUser() user: User,
    @Body() jobPostRequestDto: JobPostRequestDto,
  ) {
    console.log('user >> ', user);
    console.log('jobPostRequestDto >> ', jobPostRequestDto);
    return await this.jobPostService.createJobPost(user, jobPostRequestDto);
  }
}
