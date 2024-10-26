import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationNavbarComponent } from './organization-navbar.component';

describe('OrganizationNavbarComponent', () => {
  let component: OrganizationNavbarComponent;
  let fixture: ComponentFixture<OrganizationNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizationNavbarComponent]
    });
    fixture = TestBed.createComponent(OrganizationNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
