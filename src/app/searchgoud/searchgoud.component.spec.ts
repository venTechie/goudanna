import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchgoudComponent } from './searchgoud.component';

describe('SearchgoudComponent', () => {
  let component: SearchgoudComponent;
  let fixture: ComponentFixture<SearchgoudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchgoudComponent]
    });
    fixture = TestBed.createComponent(SearchgoudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
