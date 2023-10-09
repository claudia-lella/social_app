import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: any, limit=25, ellipsis="..."):any {

    if(value && limit < (value as string).length)
      return `${value.substring(0, limit)}${ellipsis}`
    else
      return value;
  }

}
