import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { JobPostSupport } from './JobPostSupport';
import { IsNotEmpty } from 'class-validator';
import { Company } from './Company';
import { User } from './User';

@Entity('job_post', { schema: 'part_time_monster' })
export class JobPost {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'from_user_id', length: 20 })
  fromUserId: string;

  @Column('varchar', { name: 'from_company_id', length: 20 })
  fromCompanyId: string;

  @IsNotEmpty()
  @Column('varchar', { name: 'working_period', length: 20 })
  workingPeriod: string;

  @IsNotEmpty()
  @Column('varchar', { name: 'working_day', length: 20 })
  workingDay: string;

  @IsNotEmpty()
  @Column('time', { name: 'working_start_time' })
  workingStartTime: string;

  @IsNotEmpty()
  @Column('time', { name: 'working_end_time' })
  workingEndTime: string;

  @IsNotEmpty()
  @Column('int', { name: 'pay' })
  pay: number;

  @IsNotEmpty()
  @Column('varchar', { name: 'pay_type', length: 10 })
  payType: string;

  @IsNotEmpty()
  @Column('varchar', { name: 'sex', length: 4 })
  sex: string;

  @IsNotEmpty()
  @Column('varchar', { name: 'age', length: 10 })
  age: string;

  @IsNotEmpty()
  @Column('varchar', { name: 'education', length: 10 })
  education: string;

  @IsNotEmpty()
  @Column('int', { name: 'recruit_number' })
  recruitNumber: number;

  @IsNotEmpty()
  @Column('date', { name: 'recruit_start_at' })
  recruitStartAt: string;

  @IsNotEmpty()
  @Column('date', { name: 'recruit_end_at' })
  recruitEndAt: string;

  @IsNotEmpty()
  @Column('varchar', { name: 'title', length: 50 })
  title: string;

  @Column('varchar', { name: 'content', length: 5000 })
  content: string;

  @Column('timestamp', {
    name: 'created_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date | null;

  @OneToMany(() => JobPostSupport, (jobPostSupport) => jobPostSupport.toJobPost)
  jobPostSupports: JobPostSupport[];
}
