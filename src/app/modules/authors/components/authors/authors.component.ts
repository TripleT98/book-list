import { Component } from '@angular/core';
import { Author } from '@shared/types/author.type';
import { AuthorService } from '@bookList/services/author.service';
import { ModalService, MatDialogName } from '@shared/services/modal/modal.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { cloneDeep } from 'lodash'

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent {

  protected authors: Author[] = []
  protected readonly authors$: Observable<Author[]> = this.authorS.get$().pipe(tap(authors => {this.authors = authors}));
  protected authorsNames = new Map<number, string>();

  constructor(
    private authorS: AuthorService,
    private modalS: ModalService
  ){
    this.authors$.subscribe();
  }

  protected authorEdit(event: Event, author: Author){
    const {id, name} = author;
    const text = (event?.target as HTMLElement).innerText;
    if (text === name) {
      this.authorsNames.delete(id)
      return;
    }
    this.authorsNames.set(id, text);
  }

  protected save(){
    this.authorsNames.forEach((name, id) => {
      this.authorS.change({id, name});
    });
    this.authorsNames.clear()
  }

  protected reset(){
    this.authors = cloneDeep(this.authorS.get());
    this.authorsNames.clear()
  }

  protected createAuthor(){
    this.modalS.open(MatDialogName['createAuthor'])?.afterClosed().subscribe((data: Omit<Author, 'id'>) => {
      if (!data) {
        return;
      }
      this.authorS.add(data)
    })
  }

}
