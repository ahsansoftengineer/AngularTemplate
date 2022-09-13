import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'tarjuma'
})
export class TarjumaPipe implements PipeTransform {
  constructor(private translate: TranslateService) {}

  transform(key: any, ...args: unknown[]): unknown {
    if(this.translate.currentLang == '' || this.translate.currentLang == 'en'){
      return key
    }
    console.log(key)
    console.log(args)
    // return [key] || key;
    return args[0];
  }
  // transform(value: any, args?: any): any {
  //   return null;
  // }

}
