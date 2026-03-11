import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingPolicies } from './pending-policies';

describe('PendingPolicies', () => {
  let component: PendingPolicies;
  let fixture: ComponentFixture<PendingPolicies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingPolicies]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingPolicies);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
