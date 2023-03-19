export class SimpleExistsQueryResponseDto {
  public exists: boolean;

  constructor(args: any) {
    Object.assign(this, { exist: args?.exists || false });
  }
}
