import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripHtml'
})
export class StripHtmlPipe implements PipeTransform {

  transform(value: string): string {
    if(value){

      value=value.replace(/<.*?>/g, '');
      value=value.replace(/&amp;/g, '');
      value=value.replace(/&gt;/g, '');
      value=value.replace(/&lt;/g, '');
      value=value.replace(/&nbsp;/g, '');

    }
    return value;
  }

}
