export class ValidationPatterns {
  public static readonly password: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{6,}$/;
}