import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deepPropertyAccess',
  standalone: true,
})
export class VspDeepPropertyAccessPipe implements PipeTransform {
  public transform(value: object, property: string): string | undefined {
    return property?.split('.')?.reduce((acc: any, part: string) => acc && acc[part], value) || '';
  }
}
