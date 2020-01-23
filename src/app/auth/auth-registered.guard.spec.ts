import { TestBed, async, inject } from '@angular/core/testing';

import { AuthRegisteredGuard } from './auth-registered.guard';

describe('AuthRegisteredGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthRegisteredGuard]
    });
  });

  it('should ...', inject([AuthRegisteredGuard], (guard: AuthRegisteredGuard) => {
    expect(guard).toBeTruthy();
  }));
});
