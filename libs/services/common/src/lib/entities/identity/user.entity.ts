import { BeforeInsert, Column, Entity, Generated, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne } from 'typeorm';

import { BaseEntity } from '../base.entity';
import { Claim } from './claim.entity';
import { DeviceCode } from './device-code.entity';
import { Profile } from './profile.entity';
import { RefreshToken } from './refresh-token.entity';
import { Role } from './role.entity';
import { Tenant } from './tenant.entity';

import { HashingUtils } from '../../utils/hashing.utils';

@Entity({ name: 'app_user' })
export class User extends BaseEntity {
  @Column({ unique: true })
  @Index()
  public username: string;

  @Column({ nullable: false })
  public password: string;

  @Column({ nullable: false })
  @Generated('uuid')
  @Index()
  public passwordResetToken: string;

  @Column({ type: 'timestamp with time zone', default: () => 'NOW()' })
  public passwordResetTokenExpiration: Date;

  @Column({ unique: true })
  public email: string;

  @Column({ default: false })
  public isEmailConfirmed: boolean = false;

  @Column({ nullable: false })
  @Generated('uuid')
  @Index()
  public emailConfirmationToken: string;

  @Column({ type: 'timestamp with time zone', default: () => 'NOW() + interval \'24 hours\'' })
  public emailConfirmationTokenExpiration: Date;

  @Column({ default: false })
  public isLockedOut: boolean = false;

  @Column({ name: 'app_profile_id' })
  public profileId: string;

  @OneToOne(type => Profile, profile => profile.user, { nullable: false, cascade: ['insert'] })
  @JoinColumn({ name: 'app_profile_id' })
  public profile: Profile;

  @ManyToMany(type => Role, { eager: false })
  @JoinTable({ 
    name: 'app_user_role',
    joinColumn: { name: 'app_user_id', referencedColumnName: "id" },
    inverseJoinColumn: { name: 'app_role_id', referencedColumnName: "id" }
  })
  public roles: Role[];

  @ManyToMany(type => Claim, { eager: false })
  @JoinTable({ 
    name: 'app_user_claim',
    joinColumn: { name: 'app_user_id', referencedColumnName: "id" },
    inverseJoinColumn: { name: 'app_claim_id', referencedColumnName: "id" }
  })
  public claims: Claim[];

  @ManyToMany(type => DeviceCode, { eager: false })
  @JoinTable({ 
    name: 'app_user_device_code',
    joinColumn: { name: 'app_user_id', referencedColumnName: "id" },
    inverseJoinColumn: { name: 'app_device_code_id', referencedColumnName: "id" }
  })
  public deviceCodes: DeviceCode[];

  @OneToMany(type => RefreshToken, token => token.id)
  public refreshTokens: RefreshToken[];

  @Column({ name: 'app_tenant_id' })
  public tenantId: string;

  @ManyToOne(type => Tenant, tenant => tenant.users, { nullable: false, cascade: ['insert'] })
  @JoinColumn({ name: 'app_tenant_id' })
  public tenant: Tenant;

  @BeforeInsert()
  public hashPassword() {
    this.password = HashingUtils.hash(this.password);
  }
}
