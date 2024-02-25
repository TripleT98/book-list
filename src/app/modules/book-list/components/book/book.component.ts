import { Component, Input, OnInit, HostListener } from '@angular/core';
import { Book, BookInfo } from '@shared/types/book.type';
import { ModalService, MatDialogName } from '@shared/services/modal/modal.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookListService } from '@shared/services/book-list.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],

})
export class BookComponent implements OnInit {

  @HostListener('click')
  protected select(){
    // if (!this.book) {
    //   return;
    // }
    this.pp()
    this.modalS.open(MatDialogName['bookInfo'], {bookId: this.book?.id})?.afterClosed().subscribe(status => {
      if (status !== false || !this.book) {
        return;
      }
      this.bookListService.remove(this.book.id);
      const text = `Книга '${this.book.name}' была удалена`;
      this.snackBar.open(text, '' , { duration: 2500, verticalPosition: 'top' })
    })
  }

  @Input() book!: BookInfo | null;

  constructor(
    private modalS: ModalService,
    private snackBar: MatSnackBar,
    private bookListService: BookListService
  ){

  }

  ngOnInit(){
  }

  pp(){

  }

}
