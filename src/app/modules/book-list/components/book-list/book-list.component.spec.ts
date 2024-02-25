import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookListService } from '@shared/services/book-list.service';
import { GeneralService } from '@shared/services/general.service';
import { FormGroup } from "@angular/forms";
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Book } from '@shared/types/book.type';
import { StyleService } from '@shared/services/style.service'
import { Style } from '@shared/types/style.type';
import { By } from '@angular/platform-browser';
import { PipesModule } from '@shared/modules/pipes-module/pipes.module';
import { MaterialModule } from '@shared/modules/material-module/material.module';
import { ModalService, MatDialogName } from '@shared/services/modal/modal.service';
import { MatDialogContainer } from '@angular/material/dialog';
import { MatCardHarness } from '@angular/material/card/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
//import { MatDialogContainerHarness } from '@angular/material/dialog/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { BookComponent } from './../../components/book/book.component';

import { BookListComponent } from './book-list.component';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  let loader: HarnessLoader;
  let booksS: BookListService;
  let styleS: StyleService;
  let books: Book[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        CommonModule,
        MaterialModule,
        PipesModule
      ],
      providers: [
        BookListService,
        StyleService,
        ModalService,
        MatDialog
      ],
      declarations: [
        BookListComponent,
        BookComponent
      ]
    });
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
    booksS = TestBed.get(BookListService);
    styleS = TestBed.get(StyleService);
    books = get(booksS);
  });

  function get<T extends {id:number}>(service: GeneralService<T>): T[]{
    return service.get();
  }

  function getBooksElems(){
    return fixture.debugElement.queryAll(By.directive(BookComponent));
  }

  function getBySelector(selector: string){
    return fixture.debugElement.queryAll(By.css(selector));
  }

  it('should create', async () => {
    //await new Promise((r)=>setTimeout((_: any) => {r(1)}, 4500))
    expect(component).toBeTruthy();
  });

  it('should render all books', () => {
    let bookElems = getBooksElems();
    expect(bookElems.length).toEqual(books.length);
  })

  it('should open book info card', async () => {
    let firstBook = getBooksElems()?.[0];
    let firsBookComponent = firstBook.componentInstance;
    expect(firsBookComponent).toBeTruthy();
    let selectSpy = spyOn(firsBookComponent, 'select' as any)
    expect(selectSpy).not.toHaveBeenCalled()
    firstBook.triggerEventHandler('click');
    fixture.detectChanges();
    await fixture.whenStable()
    expect(selectSpy).toHaveBeenCalledTimes(1)
  })

  it('should open creation panel', async () => {
    let openButton = getBySelector('.add-book-button')[0];
    //expect(openButton).toBeTruthy();
  })

});
