import { Column, Entity, Generated, Index, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Role } from './role.entity';

@Entity({ name: 'app_client' })
export class Client extends BaseEntity {
  @Column({ unique: true })
  @Generated('uuid')
  @Index()
  public indentifier: string;

  @Column()
  public name: string;

  @ManyToMany(type => Role, { eager: false })
  @JoinTable({ 
    name: 'app_client_role',
    joinColumn: { name: 'app_client_id', referencedColumnName: "id" },
    inverseJoinColumn: { name: 'app_role_id', referencedColumnName: "id" }
  })
  public requiredRoles: Role[];
}
