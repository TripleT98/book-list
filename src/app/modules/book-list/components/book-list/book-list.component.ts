import { Component } from '@angular/core';
import { BookListService } from '@shared/services/book-list.service';
import { FormGroup } from "@angular/forms";
import { Book } from '@shared/types/book.type';
import { StyleService } from '@shared/services/style.service'
import { Style } from '@shared/types/style.type';
import { ModalService, MatDialogName } from '@shared/services/modal/modal.service';
import { combineLatest } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent {

  protected filterStatus: boolean = false;
  public readonly filterForm = new FormGroup<Record<keyof Book, any>>({} as Record<keyof Book, any>);
  protected bookList$ = combineLatest([
    this.bookListS.get$(),
    this.filterForm.valueChanges.pipe(startWith(this.filterForm.value)),
    this.styleS.get$()
  ]).pipe(map(([books, filterVal, styles]) => {
    let filteredBooks = [...books];
    let key: keyof typeof filterVal;
    for(key in filterVal){
      const val = filterVal[key];
      if (!val) {
        continue;
      }
      if (key === 'name' || key === 'description') {
        filteredBooks = this.filterByString(filteredBooks, key, val);
      }
      else if (key === 'authorId' || key === 'langId') {
        filteredBooks = this.filterByIdPropMulti(filteredBooks, key, val);
      }
      else if (key === 'pageCount') {
        filteredBooks = this.filterByRange(filteredBooks, key, val);
      }
      else if (key === 'style') {
        const selectedStyle = styles.find(st => st.id === val);
        filteredBooks = this.filterByString(filteredBooks, key, selectedStyle?.name || '');
      }
    }
    return filteredBooks;
  }));

  constructor(
    private bookListS: BookListService,
    private modalS: ModalService,
    private styleS: StyleService,
  ){
  }

  protected createBook(){
    this.modalS.open(MatDialogName['createBook'])?.afterClosed().subscribe((data: Omit<Book, 'id'>) => {
      if (!data) {
        return;
      }
      this.bookListS.add(data)
    })
  }

  protected switchFilter(){
    this.filterStatus = !this.filterStatus;
  }

  private filterByString(books: Book[], prop: keyof Book, value: string) {
    return books.filter(book => (book[prop] as string).includes(value.trim()))
  }

  private filterByIdPropMulti(books: Book[], prop: keyof Book, value: number[]){
    if (!value.length) {
      return books;
    }
    return books.filter(book => value.includes(book[prop] as number))
  }

  private filterByRange(books: Book[], prop: keyof Book, value: [number, number]){
    return books.filter(book => (value[0] === null || book[prop] as number >= value[0]) && (value[1] === null || book[prop] as number <= value[1]));
  }

}
