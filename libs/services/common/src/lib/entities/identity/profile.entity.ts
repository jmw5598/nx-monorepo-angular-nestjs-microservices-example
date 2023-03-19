import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity } from "../base.entity";
import { Address } from "./address.entity";
import { User } from "./user.entity";

@Entity({ name: 'app_profile' })
export class Profile extends BaseEntity {
  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column({ nullable: true })
  public summary: string;

  @Column({ nullable: true })
  public avatarUrl: string;

  @Column({ name: 'app_address_id' })
  public addressId: string;

  @OneToOne(type => Address, address => address.profile, { nullable: false, cascade: ['insert', 'update'] })
  @JoinColumn({ name: 'app_address_id' })
  public address: Address;

  @OneToOne(type => User, user => user.profile)
  public user: User;
}
