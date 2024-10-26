import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProjectEmployeesComponent } from './view-project-employees.component';

describe('ViewProjectEmployeesComponent', () => {
  let component: ViewProjectEmployeesComponent;
  let fixture: ComponentFixture<ViewProjectEmployeesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewProjectEmployeesComponent]
    });
    fixture = TestBed.createComponent(ViewProjectEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
