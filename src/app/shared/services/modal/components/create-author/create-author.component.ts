import { Component, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ValidationService } from '@shared/services/validation/validation.service';
import { AuthorService } from '@shared/services/author.service';

@Component({
  selector: 'app-create-author',
  templateUrl: './create-author.component.html',
  styleUrls: ['./create-author.component.scss']
})
export class ModalCreateAuthorComponent {

  protected readonly form = new FormControl('', [Validators.required, Validators.required, Validators.maxLength(18)], [this.validationS.uniqueInCollection(inject(AuthorService), 'name')])

  constructor(
    private validationS: ValidationService
  ){

  }

}
