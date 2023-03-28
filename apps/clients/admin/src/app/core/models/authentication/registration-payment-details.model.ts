import { RegistrationCardDetails } from './registration-card-details.model';

export interface RegistrationPaymentDetails {
  firstName: string,
  lastName: string,
  address: string,
  city: string,
  state: string,
  zip: string,
  cardDetails: RegistrationCardDetails
}