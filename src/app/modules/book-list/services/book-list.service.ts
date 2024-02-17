import { Injectable } from '@angular/core';
import { Book } from '@shared/types/book.type';
import { BookList } from '@shared/types/book-list.type';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class BookListService {

  private bookList: BookList = [{
    id: 1,
    name: 'book1',
    author: 'JJ',
    pageCount: 100,
    lang: 'en',
    style: 'adventure',
  },{
    id: 2,
    name: 'book2',
    author: 'KK',
    pageCount: 120,
    lang: 'en',
    style: 'adventure',
  },{
    id: 3,
    name: 'book3',
    author: 'DD',
    pageCount: 230,
    lang: 'en',
    style: 'adventure',
  },];
  public readonly bookList$ = new BehaviorSubject<BookList>(this.bookList);

  constructor(

  ){
    this.bookList$.subscribe(bookList => {
      this.bookList = bookList;
    })
  }

  private setBookList(bookList: BookList){
    this.bookList$.next(bookList);
  }

  public addBook(book: Book){
    this.setBookList([...this.bookList, book]);
  }

  public removeBook(bookId: number): boolean{
    const newBookList = this.bookList.filter(book => book.id === bookId);
    if (newBookList.length === this.bookList.length) {
      return false;
    }
    this.setBookList(newBookList);
    return true;
  }

}
