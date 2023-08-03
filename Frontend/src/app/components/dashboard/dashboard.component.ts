import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit{
  @ViewChild('closeButton') closeButton:any
  resData:any; flag:any; search:any;
  showModal = false;imagePath:any;
  
  addProjectForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    details: new FormControl('',[Validators.required]),
    demoLink: new FormControl('',[Validators.required]),
    gitLink: new FormControl('',[Validators.required]),
  })
  resProject: any;
  filter: any; searchFlag:any;

  get Data() {
    return this.addProjectForm.controls;
  }
  constructor(private router:Router, private userService: UserService){ }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(){
    const userId = localStorage.getItem('userId');
    this.userService.getProject(userId)
    .subscribe(async(res:any)=>{
      if(res.statusCode == 200 ){
        this.resData = res.data;
        this.flag = res.data.length == 0 ? true : false;
      }
    })
  }

  ImageUpload(event:any){
  if (event.target.files.length > 0) {
    this.imagePath = event.target.files[0];
    console.log(this.imagePath);
  }
}

  addProject(){
    const userId:any = localStorage.getItem('userId');
    let formData:any = this.addProjectForm.getRawValue();
    let addProjectData = new FormData();

    addProjectData.append("name",formData.name)
    addProjectData.append("details",formData.details)
    addProjectData.append("demoLink",formData.demoLink)
    addProjectData.append("gitLink",formData.gitLink)
    addProjectData.append("image",this.imagePath)
    
    this.userService.addProject(formData, userId)
    .subscribe((res:any)=>{
      if(res.statusCode === 200){
        this.addProjectForm.reset();
        this.getProjects();
        this.closeButton.nativeElement.click();
        Swal.fire(
          'Project Added!',
          '',
          'success'
        )
      }
      if(res.statusCode === 400){
        this.router.navigate(['/add-project'])
      }
    })
  }

  filterProjects(searchdata: any) {
    if (searchdata == 'all') {
      const userId = localStorage.getItem('userId');
      this.userService.getProject(userId)
        .subscribe((res: any) => {
          this.resProject = res.data;
          this.filter = this.resProject.length != 0 ? true : false;
        });
    } else {
      this.userService
        .filterProject(searchdata)
        .subscribe((res: any) => {
          this.resProject = res.data;
          this.filter = 'filter';
          this.getProjects();
        });
    }
  }
}
