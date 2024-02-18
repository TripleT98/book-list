import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@shared/modules/material-module/material.module';
import { PipesModule } from '@shared/modules/pipes-module/pipes.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalCreateBookComponent } from './shared/services/modal/components/modal-create-book/modal-create-book.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalCreateBookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    PipesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
