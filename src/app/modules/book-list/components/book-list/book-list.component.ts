import { Component } from '@angular/core';
import { BookListService } from '@bookList/services/book-list.service';
import { ModalService, MatDialogName } from '@shared/services/modal/modal.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent {

  protected bookList$ = this.bookListS.bookList$;

  constructor(
    private bookListS: BookListService,
    private modalS: ModalService
  ){

  }

  protected createBook(){
    this.modalS.open(MatDialogName['createBook'])?.afterClosed().subscribe(data => {
      
    })
  }

}