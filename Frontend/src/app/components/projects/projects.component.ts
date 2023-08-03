import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit{
  resData:any; search:any;
  constructor(private userService: UserService){}
  
  ngOnInit(): void {
    this.getAllProject();
  }

  getAllProject(){
    this.userService.getAllProject()
      .subscribe((res:any)=>{
        if(res.statusCode == 200){
          this.resData = res.data;
        }
        if(res.statusCode == 404){
          this.userService.logout();
        }
      })
  }
}
