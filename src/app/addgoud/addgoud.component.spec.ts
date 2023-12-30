import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddgoudComponent } from './addgoud.component';

describe('AddgoudComponent', () => {
  let component: AddgoudComponent;
  let fixture: ComponentFixture<AddgoudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddgoudComponent]
    });
    fixture = TestBed.createComponent(AddgoudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
