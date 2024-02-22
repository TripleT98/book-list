import { Component, OnInit, Input } from '@angular/core';
import { CreationFormType, InputType } from '@shared/types/creation-form.type';
import { FormGroup, FormControl, FormArray } from "@angular/forms";
import { Book } from '@shared/types/book.type';
import { LangService } from '@bookList/services/lang.service';
import { AuthorService } from '@bookList/services/author.service';
import { StyleService } from '@bookList/services/style.service'
import { AnimationEvent, animate, state, style, transition, trigger } from '@angular/animations';
import { of } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit{

  protected readonly inputTypes = InputType;
  @Input() form!: FormGroup;
  protected readonly bookfilterForm: CreationFormType<Book>[] = [
    {
      prop: 'name',
      label: 'Название',
      input: {
        type: InputType['string'],
      }
    },
    {
      prop: 'authorId',
      label: 'Автор',
      input: {
        type: InputType['multiselect'],
        data$: this.authorS.get$()
      }
    },
    {
      prop: 'description',
      label: 'Описание',
      input: {
        type: InputType['string'],
      }
    },
    {
      prop: 'pageCount',
      label: 'Число страниц',
      input: {
        type: InputType['range'],
        order: [{
          prop: 'from',
          label: 'От',
          input: {
            type: InputType['number'],
          }
        }, {
          prop: 'to',
          label: 'До',
          input: {
            type: InputType['number'],
          }
        }]
      }
    },
    {
      prop: 'langId',
      label: 'Язык',
      input: {
        type: InputType['multiselect'],
        data$: this.langS.get$()
      }
    },
    {
      prop: 'style',
      label: 'Жанр',
      input: {
        type: InputType['select'],
        data$: this.styleS.get$()
      }
    },
  ];

  constructor(
    private authorS: AuthorService,
    private langS: LangService,
    private styleS: StyleService,
  ){
  }

  ngOnInit(){
    this.initForm();
  }

  private initForm(){
    this.bookfilterForm.forEach(fModel => {
      const inputOrder = fModel.input.order;
      if (this.form.get(fModel.prop)) {
        return;
      }
      if (fModel.input.type === InputType['range'] && inputOrder){
        let orderFormArray = new FormArray<FormControl>([]);
        inputOrder.forEach(_ => {
          orderFormArray.push(new FormControl<any>(null))
        });
        this.form.setControl(fModel.prop, orderFormArray);
        return;
      }
      const formControl = new FormControl(null, fModel.input.validators || []);
      this.form.setControl(fModel.prop, formControl);
    })
  }

}
