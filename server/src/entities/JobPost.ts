import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { JobPostSupport } from './JobPostSupport';

@Entity('job_post', { schema: 'part_time_monster' })
export class JobPost {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'from_user_id', length: 20 })
  fromUserId: string;

  @Column('varchar', { name: 'from_company_id', length: 20 })
  fromCompanyId: string;

  @Column('varchar', { name: 'working_period', length: 20 })
  workingPeriod: string;

  @Column('varchar', { name: 'working_day', length: 20 })
  workingDay: string;

  @Column('time', { name: 'working_start_time' })
  workingStartTime: string;

  @Column('time', { name: 'working_end_time' })
  workingEndTime: string;

  @Column('int', { name: 'pay' })
  pay: number;

  @Column('varchar', { name: 'pay_type', length: 10 })
  payType: string;

  @Column('varchar', { name: 'sex', length: 4 })
  sex: string;

  @Column('varchar', { name: 'age', length: 10 })
  age: string;

  @Column('varchar', { name: 'education', length: 10 })
  education: string;

  @Column('varchar', { name: 'occupation', length: 100 })
  occupation: string;

  @Column('int', { name: 'recruit_number' })
  recruitNumber: number;

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
