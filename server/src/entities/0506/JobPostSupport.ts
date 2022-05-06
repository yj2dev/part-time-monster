import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './User';
import { JobPost } from './JobPost';

@Index('from_user_id', ['fromUserId'], {})
@Index('to_job_post_id', ['toJobPostId'], {})
@Entity('job_post_support', { schema: 'part_time_monster' })
export class JobPostSupport {
  @Column('varchar', { primary: true, name: 'from_user_id', length: 20 })
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

  @ManyToOne(() => User, (user) => user.jobPostSupports, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'from_user_id', referencedColumnName: 'id' }])
  fromUser: User;

  @ManyToOne(() => JobPost, (jobPost) => jobPost.jobPostSupports, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'to_job_post_id', referencedColumnName: 'id' }])
  toJobPost: JobPost;
}
