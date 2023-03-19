import { User, Client } from '@vsp/services/common'

export const canUserAccessClient = (user: User | null, client: Client | null): boolean => {
  if (!user || !client) return false;
  const userRolesId: string[] = client?.requiredRoles?.map(role => role.id) || [];
  return client?.requiredRoles?.every(role => userRolesId.includes(role.id));
};
