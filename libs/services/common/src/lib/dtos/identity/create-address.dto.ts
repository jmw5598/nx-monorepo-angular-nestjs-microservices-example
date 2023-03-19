export class CreateAddressDto {
  public street: string;
  public street2: string;
  public city: string;
  public state: string;
  public zip: string;
  public country: string;

  constructor(args: any) {
    Object.assign(this, args);
  }
}