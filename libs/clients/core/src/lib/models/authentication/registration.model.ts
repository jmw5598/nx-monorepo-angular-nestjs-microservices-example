import { RegistrationProfile } from './registration-profile.model';
import { RegistrationUser } from './registration-user.model';

export interface Registration {
  user: RegistrationUser,
  profile: RegistrationProfile,
}
