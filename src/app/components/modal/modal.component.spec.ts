import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
      ],
    });

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    component.ngOnInit();
    expect(component.requestForm.get('nameRequest')).toBeTruthy();
    expect(component.requestForm.get('description')).toBeTruthy();
    expect(component.requestForm.get('user')).toBeTruthy();
  });

  it('should close the dialog when onNoClick is called', () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    component.dialogRef = dialogRefSpy;
    component.onNoClick();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });
});
