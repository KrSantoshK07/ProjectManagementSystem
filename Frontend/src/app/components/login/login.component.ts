import { Component, OnInit,  } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  decodedInfo: any; resData: any;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z0-9._@]+')]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)])
  })
  isLoggedIn: any;

  constructor(private router: Router, private userService: UserService, 
    private notifyService: NotificationService) { }
  ngOnInit(): void { }

  get Data() {
    return this.loginForm.controls;
  }

  login() {
    let loginData: any = this.loginForm.getRawValue();
    this.userService.login(loginData)
      .subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.decodedInfo = jwt_decode(res.token);
          localStorage.setItem("userId", this.decodedInfo.userId);
          localStorage.setItem("_token", res.token);
          this.isLoggedIn = this.userService.loggedIn();

          this.router.navigate(['/user/dashboard'])
          this.notifyService.showSuccess(res.message, "Success");
        }
        if (res.statusCode == 404 || res.statusCode == 400) {
          this.notifyService.showError(res.message, "Error");
        }
      })
  }

  signUp() {
    this.router.navigate(['/user/register']);
  }
}
