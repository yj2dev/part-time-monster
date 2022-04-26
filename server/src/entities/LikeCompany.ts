import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './User';
import { Company } from './Company';

@Index('from_user_id', ['fromUserId'], {})
@Index('to_company_id', ['toCompanyId'], {})
@Entity('like_company', { schema: 'part_time_monster' })
export class LikeCompany {
  @Column('varchar', { primary: true, name: 'from_user_id', length: 20 })
  fromUserId: string;

  @Column('varchar', { name: 'to_company_id', length: 20 })
  toCompanyId: string;

  @ManyToOne(() => User, (user) => user.likeCompanies, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'from_user_id', referencedColumnName: 'id' }])
  fromUser: User;

  @ManyToOne(() => Company, (company) => company.likeCompanies, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'to_company_id', referencedColumnName: 'number' }])
  toCompany: Company;
}
