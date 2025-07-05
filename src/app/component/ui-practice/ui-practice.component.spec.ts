import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiPracticeComponent } from './ui-practice.component';

describe('UiPracticeComponent', () => {
  let component: UiPracticeComponent;
  let fixture: ComponentFixture<UiPracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiPracticeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
