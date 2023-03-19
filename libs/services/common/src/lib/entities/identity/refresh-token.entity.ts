import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';

import { BaseEntity } from '../base.entity';
import { User } from './user.entity';

@Entity({ name: 'app_refresh_token' })
export class RefreshToken extends BaseEntity {
  @Column({ name: 'refresh_token' })
  @Index()
  public refreshToken: string;
  
  @Column({ default: false })
  public isBlacklisted: boolean = false;

  @Column({ name: 'app_user_id' })
  public userId: string;

  @ManyToOne(type => User, { nullable: false })
  @JoinColumn({ name: 'app_user_id' })
  public user: User;
}
