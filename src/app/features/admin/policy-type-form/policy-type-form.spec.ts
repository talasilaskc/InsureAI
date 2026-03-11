import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyTypeForm } from './policy-type-form';

describe('PolicyTypeForm', () => {
  let component: PolicyTypeForm;
  let fixture: ComponentFixture<PolicyTypeForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicyTypeForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicyTypeForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
