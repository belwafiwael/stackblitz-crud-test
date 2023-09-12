import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { RequestComponent } from './request.component';

describe('RequestComponent', () => {
  let component: RequestComponent;
  let fixture: ComponentFixture<RequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        CommonModule,
        FlexLayoutModule,
        MatCardModule,
        MatChipsModule,
        MatIconModule,
        MatMenuModule,
        RequestComponent,
      ],
    });

    fixture = TestBed.createComponent(RequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit deleteRequestClicked event when onDeleteClick is called', () => {
    const spy = spyOn(component.deleteRequestClicked, 'emit');
    const requestId = '123';
    component.onDeleteClick(requestId);
    expect(spy).toHaveBeenCalledWith(requestId);
  });

  it('should return correct status class for "En cours"', () => {
    const statusClass = component.getStatusClass('En cours');
    expect(statusClass).toBe('status-encours');
  });

  it('should return correct status class for "Validé"', () => {
    const statusClass = component.getStatusClass('Validé');
    expect(statusClass).toBe('status-valide');
  });

  it('should return correct status class for "Rejeté"', () => {
    const statusClass = component.getStatusClass('Rejeté');
    expect(statusClass).toBe('status-reject');
  });

  it('should return an empty string for an unknown status', () => {
    const statusClass = component.getStatusClass('UnknownStatus');
    expect(statusClass).toBe('');
  });
});
