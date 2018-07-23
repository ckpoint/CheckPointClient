import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanMenuComponent } from './scan-menu.component';

describe('ScanMenuComponent', () => {
  let component: ScanMenuComponent;
  let fixture: ComponentFixture<ScanMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
