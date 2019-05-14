import { Pipe, PipeTransform } from '@angular/core';
// Pipe to images base64
@Pipe({
  name: 'base64'
})
export class Base64Pipe implements PipeTransform {

  transform(value: any, args?: any): any {
    
    if(value) {
      return `data:image/png;base64,${value}`;
    } else {
      return ``;
    }
  }

}
