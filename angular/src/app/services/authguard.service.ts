import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    if (!window.localStorage.getItem('user')) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
