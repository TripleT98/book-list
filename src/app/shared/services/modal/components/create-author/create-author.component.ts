import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-author',
  templateUrl: './create-author.component.html',
  styleUrls: ['./create-author.component.scss']
})
export class ModalCreateAuthorComponent {

  protected readonly form = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(18)])

  constructor(){

  }

}
