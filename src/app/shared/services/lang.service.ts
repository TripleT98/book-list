import { Injectable } from '@angular/core';
import { GeneralService } from "./general.service";
import { Lang } from '@shared/types/lang.type';

const langs: Lang[] = [
  {id: 1, name: 'Русский'},
  {id: 2, name: 'Английский'},
  {id: 3, name: 'Французский'},
]

const collectionName = 'langs';

@Injectable({providedIn: 'root'})
export class LangService extends GeneralService<Lang> {

  constructor(

  ){
    super(collectionName);
    this.set(langs);
  }


}
