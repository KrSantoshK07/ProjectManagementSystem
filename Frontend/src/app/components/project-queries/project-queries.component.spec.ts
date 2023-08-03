import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectQueriesComponent } from './project-queries.component';

describe('ProjectQueriesComponent', () => {
  let component: ProjectQueriesComponent;
  let fixture: ComponentFixture<ProjectQueriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectQueriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectQueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
