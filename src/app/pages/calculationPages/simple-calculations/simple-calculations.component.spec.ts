import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleCalculationsComponent } from './simple-calculations.component';

describe('SimpleCalculationsComponent', () => {
  let component: SimpleCalculationsComponent;
  let fixture: ComponentFixture<SimpleCalculationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SimpleCalculationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimpleCalculationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
