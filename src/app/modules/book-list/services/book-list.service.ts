import { Injectable } from '@angular/core';
import { Book } from '@shared/types/book.type';
import { BookList } from '@shared/types/book-list.type';
import { GeneralService } from "./general.service";

const bookList: BookList = [{
  id: 1,
  name: 'book1',
  authorId: 1,
  pageCount: 100,
  langId: 1,
  style: 'adventure',
  description: 'Описание 1'
},{
  id: 2,
  name: 'book2',
  authorId: 2,
  pageCount: 120,
  langId: 2,
  style: 'adventure',
  description: 'Описание 2'
},{
  id: 3,
  name: 'book3',
  authorId: 3,
  pageCount: 230,
  langId: 3,
  style: 'adventure',
  description: 'Описание 3'
},];

@Injectable({providedIn: 'root'})
export class BookListService extends GeneralService<Book> {

  constructor(

  ){
    super();
    bookList.forEach(b => {
      this.add(b);
    })
  }


}
