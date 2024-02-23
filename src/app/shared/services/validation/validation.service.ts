import { Injectable } from '@angular/core'
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith, first } from 'rxjs/operators'
import { GeneralService } from '../general.service';

@Injectable({providedIn: 'root'})
export class ValidationService {

  uniqueInCollection<T extends {id:number}>(service: GeneralService<T>, prop: keyof T, id?: number):AsyncValidatorFn{
    return (control: AbstractControl) => {
      return combineLatest([
        control.valueChanges,
        service.get$()
      ]).pipe(
        map(([value, collection]) => {
          let isUnique: boolean;
          if (id) {
            isUnique = !!collection.find(item => item[prop] === value && id !== item.id);
          } else {
            isUnique = !!collection.find(item => item[prop] === value);
          }
          return isUnique ? { uniqueError: true } : null;
        }),
        first()
      )
    }
  }

  //Валидаторы не завязанные на Abstract controls
  maxLength(value: string, length: number): ValidationErrors | null{
    return value.length > length ? {
      maxLength: {
        actualLength: value.length,
        requiredLength: length,
      }
    } : null;
  }

  isUnique<T>(collection: T[], prop: keyof T, value: any): ValidationErrors | null{
    const isUnique = collection.find(item => item[prop] === value);
    return isUnique ? {
      uniqueError: {
        value: value,
      }
    } : null;
  }

  isUniqueAsync$<T extends { id:number }>(service: GeneralService<T>, prop: keyof T, value: any): Observable<ValidationErrors | null>{
    return service.get$().pipe(
      map((collection) => this.isUnique(collection, value, prop))
    )
  }

}
