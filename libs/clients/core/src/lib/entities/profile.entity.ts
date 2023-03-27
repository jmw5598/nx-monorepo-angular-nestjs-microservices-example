import { BaseEntity } from './base.entity';

export interface Profile extends BaseEntity {
  firstName: string,
  lastName: string,
  avatarUrl: string
}
