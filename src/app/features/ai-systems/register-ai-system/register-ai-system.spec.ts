import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAiSystem } from './register-ai-system';

describe('RegisterAiSystem', () => {
  let component: RegisterAiSystem;
  let fixture: ComponentFixture<RegisterAiSystem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterAiSystem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterAiSystem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
