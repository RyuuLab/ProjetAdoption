import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCustomComponent } from './admin-custom.component';

describe('AdminCustomComponent', () => {
  let component: AdminCustomComponent;
  let fixture: ComponentFixture<AdminCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCustomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
