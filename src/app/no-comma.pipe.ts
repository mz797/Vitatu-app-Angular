import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noComma',
})
export class NoCommaPipe implements PipeTransform {
  transform(value: number): unknown {
    if (value != null && value != undefined) {
      return value.toFixed().toString().replace(',', '');
    } else return '';
  }
}
