import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-raise-issues',
  templateUrl: './raise-issues.component.html',
  styleUrls: ['./raise-issues.component.css']
})
export class RaiseIssuesComponent implements OnInit{
  @ViewChild('closeButton') closeButton:any
  issueForm = new FormGroup({
    issue: new FormControl('', [Validators.required])
  })
  resIssue: any;
  projectId: any;
  data:any = {issue:''}

  constructor(private userSevice:UserService, private notification:NotificationService, private route:ActivatedRoute){}
  ngOnInit(): void {
    this.getIssue()
  }
  
  raiseIssue(){
    let data = this.issueForm.getRawValue();
    const userId = localStorage.getItem("userId")
    this.route.params.subscribe(par=>{
      this.projectId = par['id']
    })
    
    this.userSevice.raiseIssue(data,userId,this.projectId)
    .subscribe((res:any)=>{
      if(res.statusCode == 200){
        this.notification.showSuccess("Successfully",res.message)
        this.getIssue();
        this.data = { issue: '' }
      }
      if(res.statusCode == 400){
        this.notification.showError("Successfully",res.message)
      }
    })
  }

  getIssue(){
    // const userId = localStorage.getItem('userId');
    this.route.params.subscribe(par=>{
      this.projectId = par['id']
    })
    this.userSevice.getIssue(this.projectId)
    .subscribe((res:any)=>{
      this.resIssue = res.data;
    })
  }
}
