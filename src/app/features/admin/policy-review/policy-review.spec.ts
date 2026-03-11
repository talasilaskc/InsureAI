import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyReview } from './policy-review';

describe('PolicyReview', () => {
  let component: PolicyReview;
  let fixture: ComponentFixture<PolicyReview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicyReview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicyReview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
