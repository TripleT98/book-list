import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookComponent } from './components/book/book.component';
import { MaterialModule } from '@shared/modules/material-module/material.module';
import { BookListService } from './services/book-list.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    BookListComponent,
    BookComponent
  ],
  exports: [
    BookListComponent
  ],
})
export class BookListModule {

}
