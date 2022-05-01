import { Column, Entity, OneToMany } from 'typeorm';
import { LikeCompany } from './LikeCompany';
import { User } from './User';

@Entity('company', { schema: 'part_time_monster' })
export class Company {
  @Column('varchar', { primary: true, name: 'number', length: 20 })
  number: string;

  @Column('varchar', { name: 'name', length: 50 })
  name: string;

  @Column('varchar', { name: 'ceo_name', length: 10 })
  ceoName: string;

  @Column('varchar', { name: 'contact', length: 20 })
  contact: string;

  @Column('varchar', { name: 'address', length: 30 })
  address: string;

  @Column('varchar', { name: 'size', length: 10 })
  size: string;

  @OneToMany(() => LikeCompany, (likeCompany) => likeCompany.toCompany)
  likeCompanies: LikeCompany[];

  @OneToMany(() => User, (user) => user.toCompany)
  users: User[];
}
