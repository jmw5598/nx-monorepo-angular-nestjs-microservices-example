import { Column, Entity, Generated, Index, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "../base.entity";
import { Account } from "./account.entity";
import { User } from './user.entity';

@Entity({ name: 'app_tenant' })
export class Tenant extends BaseEntity {
  @Column({ type: 'uuid' })
  @Index()
  @Generated('uuid')
  public identifier: string;

  @Column({ default: false })
  public isLockedOut: boolean = false;

  @Column({ name: 'app_account_id' })
  public accountId: string;

  @OneToOne(type => Account, account => account.tenant, { nullable: false, cascade: ['insert'] })
  @JoinColumn({ name: 'app_account_id' })
  public account: Account;

  @OneToMany(type => User, user => user.id)
  public users: User[];
}