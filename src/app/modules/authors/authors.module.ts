import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/modules/material-module/material.module';
import { PipesModule } from '@shared/modules/pipes-module/pipes.module';
import { AuthorsComponent } from './components/authors/authors.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    PipesModule
  ],
  declarations: [
    AuthorsComponent
  ],
  exports: [
    AuthorsComponent
  ],
})
export class AuthorsModule {

}
