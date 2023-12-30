import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportFilesComponent } from './export-files.component';

describe('ExportFilesComponent', () => {
  let component: ExportFilesComponent;
  let fixture: ComponentFixture<ExportFilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExportFilesComponent]
    });
    fixture = TestBed.createComponent(ExportFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
