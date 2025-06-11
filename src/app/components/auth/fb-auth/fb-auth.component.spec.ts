import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FbAuthComponent } from './fb-auth.component';

describe('FbAuthComponent', () => {
  let component: FbAuthComponent;
  let fixture: ComponentFixture<FbAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FbAuthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FbAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
