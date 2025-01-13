import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const userAuthGuard: CanActivateFn = (route, state) => {
  const userId = localStorage.getItem('userId');
  const router = inject(Router);
  if(userId) {
    return true;
  }else{
    router.navigate(['']);
    return false;
  }
};
