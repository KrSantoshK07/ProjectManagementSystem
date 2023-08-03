import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  resAsset: any;
  constructor(private userService: UserService, private router: Router) { }
  isLoggedIn!: boolean;
  resData: any;
  name: any; profilePic: any;
  imageUrl: any = environment.imageURL;

  ngOnInit(): void {
    this.loggedIn()
  }

  loggedIn() {
    this.isLoggedIn = this.userService.loggedIn();
    if (this.isLoggedIn) {
      const userId = localStorage.getItem("userId");
      this.userService.getUser(userId)
        .subscribe((res: any) => {
          this.resData = res;
          this.name = this.resData.name.split(' ')[0];
          this.profilePic = this.resData.image;
        })
    }
  }

  signIn() {
    this.router.navigate(['/user/login']);
  }

  logout() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to logout!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FC0412',
      cancelButtonColor: '#0697F7',
      confirmButtonText: 'Yes, Logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Logged out!',
          'Thanks visit again.',
          'success'
        )
        this.userService.logout()
        this.isLoggedIn = this.userService.loggedIn();
      }
    })
  }
}
