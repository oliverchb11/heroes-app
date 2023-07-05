import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';




export const authGuardMatch: CanMatchFn = (route: Route, segments: UrlSegment[]): Observable<boolean>  | boolean  => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.checkAuthenticationStatus().pipe(
    tap( isAuthenticate => console.log(isAuthenticate)),
    tap( isAuthenticate => {
      if(!isAuthenticate)  router.navigateByUrl('/auth/login');
    })
  )
};

