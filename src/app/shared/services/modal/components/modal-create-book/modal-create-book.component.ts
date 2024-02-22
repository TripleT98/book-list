import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Book } from '@shared/types/book.type';
import { CreationFormType, InputType } from '@shared/types/creation-form.type';
import { LangService } from '@bookList/services/lang.service';
import { AuthorService } from '@bookList/services/author.service';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-modal-create-book',
  templateUrl: './modal-create-book.component.html',
  styleUrls: ['./modal-create-book.component.scss']
})
export class ModalCreateBookComponent implements OnInit {

  protected readonly inputTypes = InputType;
  protected form = new FormGroup({});
  protected readonly bookCreationForm: CreationFormType<Book>[] = [
    {
      prop: 'name',
      label: 'Название',
      input: {
        type: InputType['string'],
        validators: [ Validators.required, Validators.minLength(3), Validators.maxLength(18) ]
      }
    },
    {
      prop: 'authorId',
      label: 'Автор',
      input: {
        type: InputType['select'],
        validators: [ Validators.required, Validators.maxLength(18) ],
        data$: this.authorS.get$()
      }
    },
    {
      prop: 'description',
      label: 'Описание',
      input: {
        type: InputType['text'],
        validators: [ Validators.required, Validators.minLength(10), Validators.maxLength(100)]
      }
    },
    {
      prop: 'pageCount',
      label: 'Число страниц',
      input: {
        type: InputType['number'],
        validators: [ Validators.required, Validators.min(1) ]
      }
    },
    {
      prop: 'langId',
      label: 'Язык',
      input: {
        type: InputType['select'],
        validators: [ Validators.required, ],
        data$: this.langS.get$()
      }
    },
    {
      prop: 'style',
      label: 'Жанр',
      input: {
        type: InputType['string'],
        validators: [Validators.required, ]
      }
    },
  ];
  protected disableSaveButton$ = this.form.statusChanges.pipe(
    map(status => status === 'INVALID'),
    startWith(true)
  );

  constructor(
    private authorS: AuthorService,
    private langS: LangService,
  ){

  }

  ngOnInit(){
    this.initForm();
  }

  private initForm(){
    this.bookCreationForm.forEach(fModel => {
      const formControl = new FormControl(null, fModel.input.validators || []);
      this.form.setControl(fModel.prop, formControl);
    })
  }

}
