import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  imagePath: any;
  errMsg: any;

  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ][A-Za-z ]+')]),
    username: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z][A-Za-z0-9_]{7,29}')]),
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/) ]),
    cpassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]),
    contact: new FormControl('', [Validators.required, Validators.pattern('')]),
    image: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ][A-Za-z ]+')])
  })
  
  get Data() {
    return this.myForm.controls;
  }
  
  constructor(private router: Router, private userService: UserService, private notifyService:NotificationService) { }
  ngOnInit(): void {
    
  }

  login() {
    this.router.navigate(['/user/login'])
  }

  upImage(event: any) {
    if (event.target.files.length > 0) {
      this.imagePath = event.target.files[0];
    }
  }
  
  register() {
    if (this.imagePath != undefined) {
      if (this.imagePath.type === "image/jpg" || this.imagePath.type === "image/jpeg" || this.imagePath.type === "image/png") {
        //when we upload any attaachment we send data with formdata 
        let fdata: any = this.myForm.getRawValue();
        let formData = new FormData();
        formData.append("name", fdata.name)
        formData.append("username", fdata.username)
        formData.append("email", fdata.email)
        formData.append("password", fdata.password)
        formData.append("cpassword", fdata.cpassword)
        formData.append("contact", fdata.contact)
        formData.append("image", this.imagePath);

        this.userService.register(formData)
          .subscribe((res: any) => {
            if (res.statusCode == 200) {
              this.notifyService.showSuccess("Successfully", res.message)
              this.router.navigate(['/user/login'])
            }
            if (res.statusCode == 400) {
              this.errMsg = res.msg;
            }
          })
      }
      else {
        this.errMsg = "Only support jpg or png images";
      }
    }
    else {
      this.errMsg = "Please select a image";
    }
  }
}
