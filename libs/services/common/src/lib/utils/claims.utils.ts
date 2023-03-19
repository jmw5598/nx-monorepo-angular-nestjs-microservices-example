import { ClaimKeys } from '../enums/claim-keys.enum';
import { UserDetails } from '../models/identity/user-details.model'
import { Claims } from '../types/claims.type';

export const claimsFromUserDetails = (user: UserDetails | null): Claims | null => {
  if (!user) return null;
  
  // @TODO will need to add additional claims user.claims

  return {
    [ClaimKeys.SUBJECT]: user.id,
    [ClaimKeys.FIRST_NAME]: user.firstName,
    [ClaimKeys.LAST_NAME]: user.lastName,
    [ClaimKeys.FULL_NAME]: `${user.firstName} ${user.lastName}`,
    [ClaimKeys.USERNAME]: user.username,
    [ClaimKeys.EMAIL]: user.email,
    [ClaimKeys.ACCOUNT_ID]: user.accountId,
    [ClaimKeys.TENANT_ID]: user.tenantId,
    [ClaimKeys.ROLES]: user?.roles || [],
  } satisfies Claims;
};

export const userDetailsFromClaims = (claims: Claims | null): UserDetails | null => {
  if (!claims) return null;

  // @TODO will need to add additional claims user.claims

  return {
    id: claims[ClaimKeys.SUBJECT],
    firstName: claims[ClaimKeys.FIRST_NAME],
    lastName: claims[ClaimKeys.LAST_NAME],
    username: claims[ClaimKeys.USERNAME],
    email: claims[ClaimKeys.EMAIL],
    accountId: claims[ClaimKeys.ACCOUNT_ID],
    tenantId: claims[ClaimKeys.TENANT_ID],
    roles: claims[ClaimKeys.ROLES],
    claims: []
  } satisfies UserDetails;
};
