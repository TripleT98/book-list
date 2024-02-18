import { Injectable } from '@angular/core';
import { GeneralService } from "./general.service";
import { Lang } from '@shared/types/lang.type';

const langs: Lang[] = [
  {id: 1, name: 'ru'},
  {id: 2, name: 'en'},
  {id: 3, name: 'ch'},
]

@Injectable({providedIn: 'root'})
export class LangService extends GeneralService<Lang> {

  constructor(

  ){
    super();
    langs.forEach(b => {
      this.add(b);
    })
  }


}
