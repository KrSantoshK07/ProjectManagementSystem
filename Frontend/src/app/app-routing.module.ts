import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { CommonModalComponent } from './components/common-modal/common-modal.component';
import { ComponentsComponent } from './components/components.component';

const routes: Routes = [
  { path: '',
    component: ComponentsComponent,
    loadChildren: ()=> import('./components/components.module').then(m => m.ComponentsModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
