import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { JobPostSupport } from './JobPostSupport';
import { LikeCompany } from './LikeCompany';
import { Company } from './Company';
import { IsEmpty, IsString } from 'class-validator';

@Index('to_company_id', ['toCompanyId'], {})
@Entity('user', { schema: 'part_time_monster' })
export class User {
  @IsEmpty()
  @IsString()
  @Column('varchar', { primary: true, name: 'id', length: 20 })
  id: string;

  @IsEmpty()
  @IsString()
  @Column('varchar', { name: 'to_company_id', nullable: true, length: 20 })
  toCompanyId: string | null;

  @Column('tinyint', {
    name: 'is_company',
    nullable: true,
    default: () => "'0'",
  })
  isCompany: number | null;

  @IsEmpty()
  @IsString()
  @Column('varchar', { name: 'password', length: 100 })
  password: string;

  @IsEmpty()
  @IsString()
  @Column('varchar', { name: 'name', length: 10 })
  name: string;

  @IsEmpty()
  @Column('int', { name: 'birth', nullable: true })
  birth: number | null;

  @IsEmpty()
  @IsString()
  @Column('varchar', { name: 'sex', nullable: true, length: 4 })
  sex: string | null;

  @IsEmpty()
  @IsString()
  @Column('varchar', { name: 'email', length: 30 })
  email: string;

  @IsEmpty()
  @IsString()
  @Column('varchar', { name: 'phone', length: 20 })
  phone: string;

  @OneToMany(() => JobPostSupport, (jobPostSupport) => jobPostSupport.fromUser)
  jobPostSupports: JobPostSupport[];

  @OneToMany(() => LikeCompany, (likeCompany) => likeCompany.fromUser)
  likeCompanies: LikeCompany[];

  @ManyToOne(() => Company, (company) => company.users, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'to_company_id', referencedColumnName: 'number' }])
  toCompany: Company;
}
