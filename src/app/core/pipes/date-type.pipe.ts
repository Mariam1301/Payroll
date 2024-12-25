import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateType',
  standalone: true
})
export class DateTypePipe implements PipeTransform {

  transform(value?: unknown, ...args: unknown[]): Date|null {
    if(!!value&&(typeof value === 'string'||value instanceof Date )){
      return new Date(value)
    }
    return null;
  }

}
