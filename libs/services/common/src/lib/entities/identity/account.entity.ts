import { Column, Entity, Generated, Index, OneToOne } from "typeorm";
import { BaseEntity } from "../../entities/base.entity";
import { Tenant } from "./tenant.entity";

@Entity({ name: 'app_account' })
export class Account extends BaseEntity {
  @Column({ type: 'uuid' })
  @Index()
  @Generated('uuid')
  public identifier: string;

  @Column()
  public name: string;

  @OneToOne(type => Tenant, tenant => tenant.account)
  public tenant: Tenant;
}
