import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterExampleComponent } from './filter-example.component';

describe('FilterExampleComponent', () => {
  let component: FilterExampleComponent;
  let fixture: ComponentFixture<FilterExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterExampleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
