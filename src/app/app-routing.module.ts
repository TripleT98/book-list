import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListModule } from '@bookList/book-list.module';
import { BookListComponent } from '@bookList/components/book-list/book-list.component';

const routes: Routes = [
  { path: 'book-list', component: BookListComponent },
  { path: '**', redirectTo: 'book-list' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
