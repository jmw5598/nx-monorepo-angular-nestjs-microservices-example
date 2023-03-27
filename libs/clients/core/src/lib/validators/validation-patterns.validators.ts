export class ValidationPatterns {
  public static readonly password: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{6,}$/;
  public static readonly numbersAndCharactersOnly: RegExp = /^[A-Za-z0-9]{1,}$/;
}