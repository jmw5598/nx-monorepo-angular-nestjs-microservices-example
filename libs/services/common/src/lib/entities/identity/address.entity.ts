import { Column, Entity, OneToOne } from "typeorm";
import { BaseEntity } from "../base.entity";
import { Profile } from "./profile.entity";

@Entity({ name: 'app_address' })
export class Address extends BaseEntity {
  @Column({ nullable: true })
  public street: string;

  @Column({ nullable: true })
  public street2: string;

  @Column({ nullable: true })
  public city: string;

  @Column({ nullable: true })
  public state: string;

  @Column({ nullable: true })
  public zip: string;

  @Column({ nullable: true })
  public country: string;

  @OneToOne(type => Profile, profile => profile.address)
  public profile: Profile;
}
