import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationEmployeeComponent } from './organization-employee.component';

describe('OrganizationEmployeeComponent', () => {
  let component: OrganizationEmployeeComponent;
  let fixture: ComponentFixture<OrganizationEmployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizationEmployeeComponent]
    });
    fixture = TestBed.createComponent(OrganizationEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
