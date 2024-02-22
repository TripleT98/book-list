import { Component } from '@angular/core';
import { BookListService } from '@bookList/services/book-list.service';
import { FormGroup, FormControl } from "@angular/forms";
import { Book, BookInfo } from '@shared/types/book.type';
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
    this.filterForm.valueChanges.pipe(startWith(this.filterForm.value))
  ]).pipe(map(([books, filterVal]) => {
    for(let key in filterVal){

    }
    return books;
  }));

  constructor(
    private bookListS: BookListService,
    private modalS: ModalService
  ){
    this.filterForm.valueChanges.subscribe(console.log);
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
    return books.filter(book => (book[prop] as string).includes(value))
  }

  private filterByIdPropMulti(books: Book[], prop: keyof Book, value: number[]){
    return books.filter(book => value.includes(book[prop] as number))
  }

}

type PickKeysByType<T, D> = {
  [key in keyof T]: T[key] extends D ? D : never;
}

type StringKeys<T extends keyof PickKeysByType<Book, string>> = PickKeysByType<Book, string>[T] extends never ? never : string;
