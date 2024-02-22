import { Component, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Book, BookInfo } from '@shared/types/book.type';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {


  @Input() book!: BookInfo | null;

  constructor(
  ){

  }

  ngOnInit(){
  }

}
