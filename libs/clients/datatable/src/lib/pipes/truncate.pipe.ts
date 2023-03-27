import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
})
export class VspTruncatePipe implements PipeTransform {
  public transform(value: string | null | undefined, length: number | null | undefined): string {
    const truncatedString: string = (value ?? '').slice(0, length ?? 200);
    return truncatedString.length > 0 ? truncatedString + '...' : truncatedString;
  }
}
