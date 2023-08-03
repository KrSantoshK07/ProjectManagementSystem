import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private userService: UserService, private router:Router){}

  canActivate(){
    if (this.userService.validateLogin()) {
      return true;
    }
    else {
      return this.router.navigate(['/'])
    }
  }
  
}
