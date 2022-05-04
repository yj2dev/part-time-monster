import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import dotenv from 'dotenv';
import { User } from './src/entities/User';
import { Company } from './src/entities/Company';
import { JobPost } from './src/entities/JobPost';
import { JobPostSupport } from './src/entities/JobPostSupport';
import { LikeCompany } from './src/entities/LikeCompany';

dotenv.config();
const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [User, Company, JobPost, JobPostSupport, LikeCompany],
  logging: true,
  synchronize: true,
  keepConnectionAlive: true,
};

export = config;
