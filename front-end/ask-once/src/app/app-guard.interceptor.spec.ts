import { TestBed } from '@angular/core/testing';

import { AppGuardInterceptor } from './app-guard.interceptor';

describe('AppGuardInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AppGuardInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AppGuardInterceptor = TestBed.inject(AppGuardInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
