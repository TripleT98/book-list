import { Injectable } from '@angular/core';
import { GeneralService } from "./general.service";
import { Author } from '@shared/types/author.type';

const authors: Author[] = [
  {id: 1, name: 'J. R. R. Tolkien'},
  {id: 2, name: 'G. Orwell'},
  {id: 3, name: 'A. Pushkin'},
  {id: 4, name: 'R. Gosling'},
  {id: 5, name: 'J. Statham'},
  {id: 6, name: 'C. Bale'},
]

@Injectable({providedIn: 'root'})
export class AuthorService extends GeneralService<Author> {

  constructor(

  ){
    super();
    authors.forEach(b => {
      this.add(b);
    })
  }


}
