import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationProjectComponent } from './organization-project.component';

describe('OrganizationProjectComponent', () => {
  let component: OrganizationProjectComponent;
  let fixture: ComponentFixture<OrganizationProjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizationProjectComponent]
    });
    fixture = TestBed.createComponent(OrganizationProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
