import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookListService } from '@shared/services/book-list.service';

@Component({
  selector: 'app-modal-book-card',
  templateUrl: './modal-book-card.component.html',
  styleUrls: ['./modal-book-card.component.scss']
})
export class ModalBookCardComponent {

  constructor(
    private bookListS: BookListService,
    @Inject(MAT_DIALOG_DATA) public data: { bookId: number }
  ){
  }

}
