import { Injectable } from '@angular/core';
import { GeneralService } from "./general.service";
import { Author } from '@shared/types/author.type';

const authors: Author[] = [
  {id: 1, name: 'S. Freud'},
  {id: 2, name: 'F. Kafka'},
  {id: 3, name: 'A. Pushkin'},
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
