import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Company } from "./Company";
import { User } from "./User";
import { JobPostLike } from "./JobPostLike";
import { JobPostSupport } from "./JobPostSupport";

@Index("from_company_id", ["fromCompanyId"], {})
@Index("from_user_id", ["fromUserId"], {})
@Entity("job_post", { schema: "part_time_monster" })
export class JobPost {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "from_user_id", length: 20 })
  fromUserId: string;

  @Column("varchar", { name: "from_company_id", length: 20 })
  fromCompanyId: string;

  @Column("varchar", { name: "working_period", length: 20 })
  workingPeriod: string;

  @Column("varchar", { name: "working_day", length: 20 })
  workingDay: string;

  @Column("time", { name: "working_start_time" })
  workingStartTime: string;

  @Column("time", { name: "working_end_time" })
  workingEndTime: string;

  @Column("int", { name: "pay" })
  pay: number;

  @Column("varchar", { name: "pay_type", length: 10 })
  payType: string;

  @Column("varchar", { name: "sex", length: 4 })
  sex: string;

  @Column("varchar", { name: "age", length: 10 })
  age: string;

  @Column("varchar", { name: "education", length: 10 })
  education: string;

  @Column("int", { name: "recruit_number" })
  recruitNumber: number;

  @Column("date", { name: "recruit_start_at" })
  recruitStartAt: string;

  @Column("date", { name: "recruit_end_at" })
  recruitEndAt: string;

  @Column("varchar", { name: "title", length: 50 })
  title: string;

  @Column("varchar", { name: "content", length: 5000 })
  content: string;

  @Column("timestamp", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @ManyToOne(() => Company, (company) => company.jobPosts, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "from_company_id", referencedColumnName: "number" }])
  fromCompany: Company;

  @ManyToOne(() => User, (user) => user.jobPosts, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "from_user_id", referencedColumnName: "id" }])
  fromUser: User;

  @OneToMany(() => JobPostLike, (jobPostLike) => jobPostLike.toJobPost)
  jobPostLikes: JobPostLike[];

  @OneToMany(() => JobPostSupport, (jobPostSupport) => jobPostSupport.toJobPost)
  jobPostSupports: JobPostSupport[];
}
