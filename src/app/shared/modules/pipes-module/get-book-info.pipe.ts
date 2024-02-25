import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { LangService } from '@shared/services/lang.service';
import { AuthorService } from '@shared/services/author.service';
import { Book, BookInfo } from '@shared/types/book.type';
import { BookListService } from '@shared/services/book-list.service';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Pipe({
  name: 'getBookInfo'
})
@Injectable({
  providedIn: 'root'
})
export class GetBookInfoPipe implements PipeTransform {

  constructor(
    private authorS: AuthorService,
    private langS: LangService,
    private bookListS: BookListService,
  ){
  }

  transform(bookId: number): Observable<BookInfo>{
    return combineLatest([
      this.bookListS.get$(),
      this.authorS.get$(),
      this.langS.get$(),
    ]).pipe(
      map(([books, authors, langs]) => {
        const book = books.find(b => b.id === bookId) as Book;
        if (!book) {
          return {} as Book;
        }
        const author = authors.find(a => a.id === book.authorId)
        const lang = langs.find(a => a.id === book.langId)
        return {...book, author, lang}
      })
    )
  }

}
