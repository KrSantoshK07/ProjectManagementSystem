import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent implements OnInit{
  projectId: any;
  resProject: any;
  name: any;
  constructor(private userService: UserService, private route:ActivatedRoute
    ,private router: Router){}
  ngOnInit(): void {
    this.getDetails()
  }

  imageURL:any = 'http://localhost:8890/uploads/projectLogo/';
  getDetails(){
    this.route.params.subscribe(par=>{
      this.projectId = par['id']
    })
    this.userService.getProjectById(this.projectId)
      .subscribe((res: any) => {
        this.resProject = res.data;
      })
  }
  replyQue(id:any){
    this.route.params.subscribe(par=>{
      this.projectId = par['id']
    })
    this.router.navigate([`/user/raise-issues/${this.projectId}`]);
  }
}
