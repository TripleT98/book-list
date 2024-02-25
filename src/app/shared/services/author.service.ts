import { Injectable } from '@angular/core';
import { GeneralService } from "./general.service";
import { Author } from '@shared/types/author.type';

const authors: Author[] = [
  {id: 1, name: 'Джон Толкин'},
  {id: 2, name: 'Джордж Оруэлл'},
  {id: 3, name: 'Александр Пушкин'},
]

const collectionName = 'authors';

@Injectable({providedIn: 'root'})
export class AuthorService extends GeneralService<Author> {

  constructor(

  ){
    super(collectionName);
    const storaged = this.getFromStorage();
    if (!storaged?.length) {
      this.set(authors);
    }
    //для загрузки коллецкции из localStorage
    this.setFromStorage();
  }


}
