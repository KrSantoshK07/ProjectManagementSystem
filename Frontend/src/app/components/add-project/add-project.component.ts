import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent {
  addProjectForm = new FormGroup({
    name: new FormControl('',[Validators.required, Validators.pattern('')]),
    details: new FormControl('',[Validators.required]),
    demoLink: new FormControl('',[Validators.required]),
    gitLink: new FormControl('',[Validators.required]),
  })

  constructor(private userService: UserService, private router:Router){}
  
  get Data(){
    return this.addProjectForm.controls;
  }

  addProject(){
    const formData = this.addProjectForm.getRawValue();

    // this.userService.addProject(formData)
    // .subscribe((res:any)=>{
    //   if(res.statusCode === 200){
    //     this.router.navigate(['/dashboard'])
    //   }
    //   if(res.statusCode === 400){
    //     this.router.navigate(['/add-project'])
    //   }
    // })
  }
}
