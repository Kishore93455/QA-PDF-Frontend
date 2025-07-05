import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetaTemplateComponent } from './meta-template.component';

describe('MetaTemplateComponent', () => {
  let component: MetaTemplateComponent;
  let fixture: ComponentFixture<MetaTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetaTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetaTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
