import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-project-queries',
  templateUrl: './project-queries.component.html',
  styleUrls: ['./project-queries.component.css']
})
export class ProjectQueriesComponent implements OnInit {
  resConversation: any;
  conversation: any;
  data:any = {answer:''}

  queryForm = new FormGroup({
    answer: new FormControl('', [Validators.required])
  })
  projectId: any;

  constructor(private userService: UserService, private notifyService: NotificationService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.getConversation();
  }

  reply() {
    const formData = this.queryForm.getRawValue();
    const userId = localStorage.getItem('userId');
    this.route.params.subscribe(par=>{
      this.projectId = par['id'];
    })
    this.userService.reply(formData, userId, this.projectId)
      .subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.resConversation = res;
          this.notifyService.showSuccess(res.message, "Success")
          this.ngOnInit();
        }
        if (res.statusCode == 404) {
          this.notifyService.showWarning(res.message, "Warning")
        }
      })
  }

  getConversation() {
    const userId = localStorage.getItem('userId');
    this.route.params.subscribe(par=>{
      this.projectId = par['id'];
    })
    this.userService.getConversation(this.projectId)
      .subscribe((res: any) => {
        this.conversation = res.data;
        this.data = { answer: '' }
      })
  }
}
