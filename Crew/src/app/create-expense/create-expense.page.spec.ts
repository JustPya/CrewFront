import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExpensePage } from './create-expense.page';

describe('CreateExpensePage', () => {
  let component: CreateExpensePage;
  let fixture: ComponentFixture<CreateExpensePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateExpensePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateExpensePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
