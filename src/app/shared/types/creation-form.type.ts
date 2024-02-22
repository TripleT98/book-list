import { ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';

export type CreationFormType<T extends Record<string, any>> = {
  prop: keyof T;
  label?: string;
  input: {
    type: InputType,
    validators? : ValidatorFn[],
    order?: [CreationFormType<any>, CreationFormType<any>],
    data?: DataType,
    data$?: Observable<DataType>
  }
}

export type DataType = Array<Record<string, any> & { id: number }>;

export enum InputType {
  'string' = 'string',
  'number' = 'number',
  'text' = 'text',
  'select' = 'select',
  'multiselect' = 'multiselect',
  'range' = 'range'
}
