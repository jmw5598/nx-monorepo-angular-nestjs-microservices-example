import { Column, Entity } from "typeorm";
import { BaseEntity } from "../base.entity";

@Entity({ name: 'app_claim' })
export class Claim extends BaseEntity {
  @Column()
  public type: string;

  @Column()
  public value: string;
}
