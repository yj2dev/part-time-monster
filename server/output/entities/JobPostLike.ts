import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { JobPost } from "./JobPost";

@Index("from_user_id", ["fromUserId"], {})
@Index("to_job_post_id", ["toJobPostId"], {})
@Entity("job_post_like", { schema: "part_time_monster" })
export class JobPostLike {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "from_user_id", length: 20 })
  fromUserId: string;

  @Column("int", { name: "to_job_post_id" })
  toJobPostId: number;

  @ManyToOne(() => User, (user) => user.jobPostLikes, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "from_user_id", referencedColumnName: "id" }])
  fromUser: User;

  @ManyToOne(() => JobPost, (jobPost) => jobPost.jobPostLikes, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "to_job_post_id", referencedColumnName: "id" }])
  toJobPost: JobPost;
}
