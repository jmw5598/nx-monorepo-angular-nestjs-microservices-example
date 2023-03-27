import { RegistrationProfile } from './registration-profile.model';

export interface RegistrationUser {
  email: string,
  userName: string,
  password: string,
  confirmPassword: string,
  profile: RegistrationProfile,
}
