import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './modal.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let mockMatDialogRef: MatDialogRef<ModalComponent>;

  beforeEach(() => {
    mockMatDialogRef = jasmine.createSpyObj(['close']);
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        ModalComponent,
        NoopAnimationsModule,
      ],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: mockMatDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create the component', () => {
  //   expect(component).toBeTruthy();
  // });

  it('should initialize the form', () => {
    component.ngOnInit();
    expect(component.requestForm.get('nameRequest')).toBeTruthy();
    expect(component.requestForm.get('description')).toBeTruthy();
    expect(component.requestForm.get('user')).toBeTruthy();
  });

  it('should close the modal when onNoClick is called', () => {
    component.onNoClick();
    expect(mockMatDialogRef.close).toHaveBeenCalled();
  });

  it('should have a disabled "Ajouter" button when the form is invalid', () => {
    const addButton = fixture.nativeElement.querySelector('.btn-add');
    expect(addButton.disabled).toBeTruthy();
  });

  it('should have an enabled "Ajouter" button when the form is valid', () => {
    const addButton = fixture.nativeElement.querySelector('.btn-add');
    component.requestForm.patchValue({
      nameRequest: 'Test',
      description: 'Test Description',
      user: 'Test User',
    });
    fixture.detectChanges();
    expect(addButton.disabled).toBeFalsy();
  });
});
