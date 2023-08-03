import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiseIssuesComponent } from './raise-issues.component';

describe('RaiseIssuesComponent', () => {
  let component: RaiseIssuesComponent;
  let fixture: ComponentFixture<RaiseIssuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaiseIssuesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaiseIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
