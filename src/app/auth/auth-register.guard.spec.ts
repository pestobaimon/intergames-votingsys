import { TestBed, async, inject } from '@angular/core/testing';

import { AuthRegisterGuard } from './auth-register.guard';

describe('AuthRegisterGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthRegisterGuard]
    });
  });

  it('should ...', inject([AuthRegisterGuard], (guard: AuthRegisterGuard) => {
    expect(guard).toBeTruthy();
  }));
});
