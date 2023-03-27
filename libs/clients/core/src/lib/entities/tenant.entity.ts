import { Team } from './team.entity';

export interface Tenant {
  id: string,
  name: string,
  isActive: boolean,
  teamId: string,
  team?: Team
}
