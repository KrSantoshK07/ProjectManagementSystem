import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router,private notifyService:NotificationService) { }
  
  intercept(req: { clone: (arg0: { setHeaders: { Authorization: string; }; }) => any; }, next: { handle: (arg0: any) => any; }) {
    const tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `${localStorage.getItem('_token')}`
      }
    })

    return next.handle(tokenizedReq).pipe(
      tap(
        () => { },
        err => {
          localStorage.removeItem('_token');
          localStorage.removeItem("userId")
          this.notifyService.showError("Login Again", "Session Expired!")
          this.router.navigate(['/']);
        }
      )
    );
  }
}
