import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorsComponent } from '@authors/components/authors/authors.component';
import { BookListComponent } from '@bookList/components/book-list/book-list.component';

const routes: Routes = [
  { path: 'book-list', component: BookListComponent },
  { path: 'authors', component: AuthorsComponent },
  { path: '**', redirectTo: 'book-list' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
