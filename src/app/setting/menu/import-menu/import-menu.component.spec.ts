import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportMenuComponent } from './import-menu.component';

describe('ImportMenuComponent', () => {
  let component: ImportMenuComponent;
  let fixture: ComponentFixture<ImportMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
