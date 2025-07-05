import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatFormsComponent } from './mat-forms.component';

describe('MatFormsComponent', () => {
  let component: MatFormsComponent;
  let fixture: ComponentFixture<MatFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatFormsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
