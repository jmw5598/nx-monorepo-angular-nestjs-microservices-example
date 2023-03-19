import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Claim } from './claim.entity';

@Entity({ name: 'app_role' })
export class Role extends BaseEntity {
  @Column({ nullable: false, unique: true })
  public name: string

  @ManyToMany(type => Role, { eager: false })
  @JoinTable({ 
    name: 'app_role_claim',
    joinColumn: { name: 'app_role_id', referencedColumnName: "id" },
    inverseJoinColumn: { name: 'app_claim_id', referencedColumnName: "id" }
  })
  public claims: Claim[] | null | undefined;
}
