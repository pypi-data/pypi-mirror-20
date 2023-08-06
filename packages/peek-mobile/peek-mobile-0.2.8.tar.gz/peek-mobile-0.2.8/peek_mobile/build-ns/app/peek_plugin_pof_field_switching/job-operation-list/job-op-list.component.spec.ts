/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JobOperationComponent } from './job-op.component';

describe('JobOperationComponent', () => {
  let component: JobOperationComponent;
  let fixture: ComponentFixture<JobOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
