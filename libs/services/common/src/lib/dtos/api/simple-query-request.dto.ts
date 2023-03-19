export class SimpleQueryRequestDto {
  public query: String;

  constructor(args: any) {
    Object.assign(this, { query: args?.query || null });
  }
}
