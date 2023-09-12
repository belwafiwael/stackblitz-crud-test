import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestComponent } from './request.component';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';

describe('RequestComponent', () => {
  let component: RequestComponent;
  let fixture: ComponentFixture<RequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestComponent],
      imports: [
        MatCardModule,
        MatChipsModule,
        MatIconModule,
        MatMenuModule,
        FlexLayoutModule,
        CommonModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display request details when request input is provided', () => {
    component.request = {
      nameRequest: 'Test Request',
      description: 'Test Description',
      user: 'Test User',
      id: '123',
      status: 'En cours',
    };

    fixture.detectChanges();

    const cardTitle = fixture.nativeElement.querySelector('.mat-card-title');
    const cardSubtitle =
      fixture.nativeElement.querySelector('.mat-card-subtitle');
    const chipName = fixture.nativeElement.querySelector('.chip-name');
    const chipContrat = fixture.nativeElement.querySelector('.chip-contrat');
    const chipStatus = fixture.nativeElement.querySelector('.status');

    expect(cardTitle.textContent).toContain('Test Request');
    expect(cardSubtitle.textContent).toContain('Test Description');
    expect(chipName.textContent).toContain('Test User');
    expect(chipContrat.textContent).toContain('Contrat 123');
    expect(chipStatus.textContent).toContain('En cours');
  });

  it('should emit deleteRequestClicked event when onDeleteClick is called', () => {
    const deleteSpy = spyOn(component.deleteRequestClicked, 'emit');
    component.onDeleteClick('123');
    expect(deleteSpy).toHaveBeenCalledWith('123');
  });
});
