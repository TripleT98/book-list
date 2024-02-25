import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'transformLangName'
})
export class TransformLangNamePipe implements PipeTransform {

  transform(langName: string): string{
    return (langName.slice(0, -2) + 'ом').toLowerCase();
  }

}
