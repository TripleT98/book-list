import { Injectable } from '@angular/core';
import { GeneralService } from "./general.service";
import { Style } from "@shared/types/style.type";
import { BookListService } from './book-list.service';

@Injectable({providedIn: 'root'})
export class StyleService extends GeneralService<Style> {

  constructor(
    private bookListS: BookListService
  ){
    super();
    this.bookListS.get$().subscribe(bookList => {
      let styleSet = new Set<string>();
      bookList.forEach(book => {
        styleSet.add(book.style);
      });
      this.set(Array.from(styleSet).map(s => ({name: s})));
    });
  }


}
