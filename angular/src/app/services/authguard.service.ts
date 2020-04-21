import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { StorageService } from './storege.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(private router: Router, private storage: StorageService) { }

  canActivate(): boolean {
    if (!this.storage.getData('user')) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}

@Injectable({
  providedIn: 'root'
})
export class LoginAuthguardService implements CanActivate {

  constructor(private router: Router, private storage: StorageService) { }

  canActivate(): boolean {
    if (this.storage.getData('user')) {
      this.router.navigate(['profile']);
      return false;
    }
    return true;
  }
}