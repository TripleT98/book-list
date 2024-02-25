import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthorService } from '@shared/services/author.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/modules/material-module/material.module';
import { PipesModule } from '@shared/modules/pipes-module/pipes.module';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from '@shared/services/modal/modal.service';
import { ValidationService } from '@shared/services/validation/validation.service';
import { DestroyService } from '@shared/services/destroy/destroy.service';
import { AuthorsComponent } from './authors.component';

describe('AuthorsComponent', () => {
  let component: AuthorsComponent;
  let fixture: ComponentFixture<AuthorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MaterialModule,
        PipesModule,
        NoopAnimationsModule
      ],
      providers: [
        ModalService,
        ValidationService,
        AuthorService,
        DestroyService,
        MatDialog
      ],
      declarations: [AuthorsComponent]
    });
    fixture = TestBed.createComponent(AuthorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
