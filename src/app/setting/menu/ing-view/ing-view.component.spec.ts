import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngViewComponent } from './ing-view.component';

describe('IngViewComponent', () => {
  let component: IngViewComponent;
  let fixture: ComponentFixture<IngViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
