import { Module } from '@nestjs/common';
import { JobPostController } from './job-post.controller';
import { JobPostService } from './job-post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/User';
import { Company } from '../entities/Company';
import { AuthModule } from '../auth/auth.module';
import { JobPostRepository } from './job-post.repository';
import { JobPost } from '../entities/JobPost';

@Module({
  imports: [TypeOrmModule.forFeature([User, Company, JobPost]), AuthModule],
  controllers: [JobPostController],
  providers: [JobPostService, JobPostRepository],
})
export class JobPostModule {}
