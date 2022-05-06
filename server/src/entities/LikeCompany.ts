import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { Company } from "./Company";
import { User } from "./User";

@Index("to_company_id", ["toCompanyId"], {})
@Index("from_user_id", ["fromUserId"], {})
@Entity("like_company", { schema: "part_time_monster" })
export class LikeCompany {
  @Column("varchar", { primary: true, name: "from_user_id", length: 20 })
  fromUserId: string;

  @Column("varchar", { name: "to_company_id", length: 20 })
  toCompanyId: string;

  @ManyToOne(() => Company, (company) => company.likeCompanies, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "to_company_id", referencedColumnName: "number" }])
  toCompany: Company;

  @OneToOne(() => User, (user) => user.likeCompany, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "from_user_id", referencedColumnName: "id" }])
  fromUser: User;
}
