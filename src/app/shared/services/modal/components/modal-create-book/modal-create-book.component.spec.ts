import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateBookComponent } from './modal-create-book.component';

describe('ModalCreateBookComponent', () => {
  let component: ModalCreateBookComponent;
  let fixture: ComponentFixture<ModalCreateBookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCreateBookComponent]
    });
    fixture = TestBed.createComponent(ModalCreateBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
