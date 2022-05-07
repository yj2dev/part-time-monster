import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { JobPost } from './JobPost';
import { User } from './User';

@Index('to_job_post_id', ['toJobPostId'], {})
@Index('from_user_id', ['fromUserId'], {})
@Entity('job_post_support', { schema: 'part_time_monster' })
export class JobPostSupport {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'from_user_id', length: 20 })
  fromUserId: string;

  @Column('int', { name: 'to_job_post_id' })
  toJobPostId: number;

  @Column('varchar', { name: 'content', length: 1000 })
  content: string;

  @Column('timestamp', {
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne(() => JobPost, (jobPost) => jobPost.jobPostSupports, {
    eager: true,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'to_job_post_id', referencedColumnName: 'id' }])
  toJobPost: JobPost;

  @ManyToOne(() => User, (user) => user.jobPostSupports, {
    eager: true,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'from_user_id', referencedColumnName: 'id' }])
  fromUser: User;
}
