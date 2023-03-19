import * as bcrypt from 'bcrypt';

export class HashingUtils {
  private static readonly _hasingSaltOrRounds: number = 10;

  public static hash(value: string): string {
    return bcrypt.hashSync(value, HashingUtils._hasingSaltOrRounds);
  }

  public static compare(value: string, hash: string): boolean {
    return bcrypt.compareSync(value, hash);
  }
}
