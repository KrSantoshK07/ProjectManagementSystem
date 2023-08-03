import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { ProjectQueriesComponent } from './project-queries/project-queries.component';
import { ProjectsComponent } from './projects/projects.component';
import { CommonModalComponent } from './common-modal/common-modal.component';
import { RaiseIssuesComponent } from './raise-issues/raise-issues.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { UserGuard } from '../guards/user.guard';

const routes: Routes = [
  { path: 'user', component: WelcomeComponent},
  { path: 'user/login', component: LoginComponent},
  { path: 'user/register', component: RegisterComponent},
  { path: 'user/dashboard', component: DashboardComponent, canActivate:[UserGuard]},
  { path: 'user/add-project', component: AddProjectComponent, canActivate:[UserGuard]},
  { path: 'user/queries/:id', component: ProjectQueriesComponent, canActivate:[UserGuard]},
  { path: 'user/projects', component: ProjectsComponent, canActivate:[UserGuard]},
  { path: 'user/editProject/:id', component: CommonModalComponent, canActivate:[UserGuard]},
  { path: 'user/raise-issues/:id', component: RaiseIssuesComponent, canActivate:[UserGuard]},
  { path: 'user/view-details/:id', component: ViewDetailsComponent, canActivate:[UserGuard]},

  { path: '**', redirectTo: 'user', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
