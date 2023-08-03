import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-common-modal',
  templateUrl: './common-modal.component.html',
  styleUrls: ['./common-modal.component.css']
})
export class CommonModalComponent implements OnInit{
  editProjectForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    details: new FormControl('', [Validators.required]),
    demoLink: new FormControl('', [Validators.required]),
    gitLink: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  })
  resOneProject: any;
  name: any;
  details: any;
  demoLink: any;
  gitLink: any;
  id: any;
  image: any;
  resData: any;

  constructor(private userService: UserService, private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(par=>{
      this.id = par['id'];
      this.editProject(this.id);
    })
  }

  imagePath: any;
  get Data() {
    return this.editProjectForm.controls;
  }

  ImageUpload(event: any) {
    if (event.target.files.length > 0) {
      this.imagePath = event.target.files[0];
    }
  }
  
  editProject(id: any) {
    this.userService.getProjectById(id)
      .subscribe((res: any) => {
        this.resOneProject = res.data;
        this.name = this.resOneProject.name;
        this.details = this.resOneProject.details;
        this.demoLink = this.resOneProject.demoLink;
        this.gitLink = this.resOneProject.gitLink;
        this.image = this.resOneProject.image;
        console.log(this.resOneProject);
      })
  }

  updateProject(){
    let fData = this.editProjectForm.getRawValue();
    this.userService.updateProject(fData,this.id)
    .subscribe((res:any)=>{
      this.resData = res;
      this.editProject(res._id)
      Swal.fire(
        'Good job!',
        'Project Updated!',
        'success'
      )
      this.router.navigate(['/dashboard']);
    })
  }
}
