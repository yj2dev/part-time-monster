import {
  Body,
  Controller,
  Get,
  Param,
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

@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
@Controller('api/job-post')
export class JobPostController {
  constructor(private readonly jobPostService: JobPostService) {}

  @Get('/:postId/detail')
  async getDetailJobPost(@Param('postId') postId: string): Promise<JobPost> {
    return this.jobPostService.getDetailJobPost(postId);
  }

  @Get('all')
  async getAllJobPost(): Promise<JobPost[]> {
    return this.jobPostService.getAllJobPost();
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
