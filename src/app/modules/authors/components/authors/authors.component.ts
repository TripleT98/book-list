import { Component, Renderer2, ElementRef } from '@angular/core';
import { Author } from '@shared/types/author.type';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthorService } from '@shared/services/author.service';
import { ModalService, MatDialogName } from '@shared/services/modal/modal.service';
import { ValidationService } from '@shared/services/validation/validation.service';
import { GetErrorMessagePipe } from '@shared/modules/pipes-module/get-err-mess.pipe';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatListItem } from '@angular/material/list';
import { DestroyService } from '@shared/services/destroy/destroy.service';
import { Observable } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';
import { cloneDeep } from 'lodash'

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
  providers: [DestroyService]
})
export class AuthorsComponent {

  protected readonly namesForm = new FormGroup<any>({});
  protected readonly authors$: Observable<Author[]> = this.authorS.get$().pipe(tap(authors => this.initNamesForm(authors)));
  protected authorsNames = new Map<number, string>();

  private destroy$ = this.destroyS.destroy$;

  constructor(
    private authorS: AuthorService,
    private modalS: ModalService,
    private validationS: ValidationService,
    private destroyS: DestroyService
  ){
    this.namesForm.valueChanges.subscribe(console.log);

    this.authorS.remove$.pipe(takeUntil(this.destroy$)).subscribe(removedItem => {
      this.namesForm.removeControl(String(removedItem.id));
    })
  }

  private initNamesForm(authors: Author[]){
    authors.forEach(author => {
      const id = String(author.id);
      const existingForm = this.namesForm.get(id);
      if (existingForm) {
        return;
      }
      const newForm = new FormControl(author.name, [Validators.maxLength(18), Validators.required], [this.validationS.uniqueInCollection(this.authorS, 'name', author.id)]);
      newForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(val => {
        const currAuthor = this.authorS.getId(author.id);
        if (!currAuthor) {
          return;
        }
        if (val === currAuthor.name) {
          this.authorsNames.delete(author.id)
          return;
        }
        this.authorsNames.set(author.id, val || '');
      })
      this.namesForm.addControl(id, newForm);
    })
  }

  protected save(){
    this.authorsNames.forEach((name, id) => {
      this.authorS.change({id, name});
    });
    this.authorsNames.clear()
  }

  protected reset(){
    let formName: keyof typeof this.namesForm.controls;
    for (formName in this.namesForm.controls) {
      const id = Number(formName);
      const author = this.authorS.getId(id);
      if (!author) {
        return;
      }
      this.namesForm.controls[formName].setValue(author.name);
    };
    this.authorsNames.clear()
  }

  protected deleteAuthor(id: number){
    this.authorS.remove(id);
    this.authorsNames.delete(id);
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
