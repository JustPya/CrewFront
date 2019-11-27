import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupItemsPage } from './group-items.page';

describe('GroupItemsPage', () => {
  let component: GroupItemsPage;
  let fixture: ComponentFixture<GroupItemsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupItemsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupItemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
