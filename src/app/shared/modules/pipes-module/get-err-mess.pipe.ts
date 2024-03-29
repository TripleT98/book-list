import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable, startWith, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
@Pipe({
  name: 'getErrMess'
})
export class GetErrorMessagePipe implements PipeTransform {

  private readonly errors: Record<string, Function> = {
    minlength(lengths: {actualLength: number, requiredLength: number}){
      const {actualLength, requiredLength} = lengths;
      return `Минимальная длина ${requiredLength}. Текущая ${actualLength}.`
    },
    maxlength(lengths: {actualLength: number, requiredLength: number}){
      const {actualLength, requiredLength} = lengths;
      return `Максимальная длина ${requiredLength}. Текущая ${actualLength}.`
    },
    required(){
      return "Обязательное поле!"
    },
    min(data: {min: number}){
      return `Минимальная величина ${data.min}`
    },
    uniqueError(data?: {value: string}){
      if (data?.value) {
        return `Значение ${data.value} повторяется`
      }
      return 'Не уникальное значение';
    }
  }

  constructor(){

  }

  transform(form: AbstractControl | null): Observable<string | null>{
    return form ? form.valueChanges.pipe(startWith(null), map(_ => {
      const errors = Object.entries(form.errors || {});
      if (!errors?.length) {
        return '';
      }
      const [errorName, errorData] =  errors[0];
      const errorText = (this.errors as any)[errorName]?.(errorData);
      return errorText || '';
    })) : of('');
  }

  public getErrors(){
    return this.errors;
  }

}
