import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';

import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ckeditor4-angular';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { ProjectQueriesComponent } from './project-queries/project-queries.component';
import { ProjectsComponent } from './projects/projects.component';
import { CommonModalComponent } from './common-modal/common-modal.component';
import { SearchPipe } from '../pipes/search.pipe';
import { RaiseIssuesComponent } from './raise-issues/raise-issues.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { ComponentsComponent } from './components.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    WelcomeComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    ProjectCardComponent,
    AddProjectComponent,
    ProjectQueriesComponent,
    ProjectsComponent,
    CommonModalComponent,
    SearchPipe,
    RaiseIssuesComponent,
    ViewDetailsComponent,
    ComponentsComponent,
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    HttpClientModule,
   
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule { }
