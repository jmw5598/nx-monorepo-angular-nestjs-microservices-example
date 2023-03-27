import { BaseEntity } from './base.entity';

export interface Team extends BaseEntity {
  name: string,
  website?: string,
  logoUrl?: string
  summary?: string,
  paypalAddress?: string,
  cashAppAddress?: string,
  bitcoinAddress?: string,
  ethereumAddress?: string
}
