import { Tenant, IRepository } from '@vsp/services/common';

export const TENANTS_REPOSITORY_TOKEN: string = 'TENANTS_REPOSITORY_TOKEN';

export interface ITenantsRepository extends IRepository<Tenant, string> { }
