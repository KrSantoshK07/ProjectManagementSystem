import { Component, Input, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardComponent implements OnInit {
  @ViewChild('closeButton') closeButton: any;
  @Input() data: any;
  @Input() flag: any;

  resOneProject: any;
  imagePath: any;
  resData: any;

  constructor(private userService: UserService, private router: Router, private changeDetect: ChangeDetectorRef) { }

  editProjectForm = new FormGroup({
    name1: new FormControl('', [Validators.required,]),
    details1: new FormControl('', [Validators.required]),
    demoLink1: new FormControl('', [Validators.required]),
    gitLink1: new FormControl('', [Validators.required]),
    image1: new FormControl('', [Validators.required]),
  })

  get Data() {
    return this.editProjectForm.controls;
  }

  ImageUpload(event: any) {
    if (event.target.files.length > 0) {
      this.imagePath = event.target.files[0];
    }
  }

  ngOnInit(): void { }

  editProject(id: any) {
    this.router.navigate([`/user/editProject/${id}`])
  }

  view(id: any) {
    this.router.navigate([`/user/view-details/${id}`])
  }

  deleteProject(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You wan't retrieve again!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FC0412',
      cancelButtonColor: '#0697F7',
      confirmButtonText: 'Yes, Delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteProject(id)
          .subscribe((res: any) => {
            this.resData = res.data;
          })
        const userId = localStorage.getItem('userId');
        this.userService.getProject(userId)
          .subscribe((res: any) => {
            this.resData = res.data;
            Swal.fire(
              'Project deleted!',
              'Successfully deleted.',
              'success'
            )
          })
      }
    })
  }

  replyQue(id: any) {
    this.closeButton.nativeElement.click();
    this.router.navigate([`/user/raise-issues/${id}`]);
  }
}
