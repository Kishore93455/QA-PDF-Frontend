import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetaHeaderComponent } from './meta-header.component';

describe('MetaHeaderComponent', () => {
  let component: MetaHeaderComponent;
  let fixture: ComponentFixture<MetaHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetaHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetaHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
