import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TaskListComponent } from './task/task-list/task-list.component';
import { TaskFormComponent } from './task/task-form/task-form.component';
import { AuthComponent } from './auth/auth/auth.component';

const routes: Routes = [
  {path:" ", component:AppComponent},
  {path:"auth",component:AuthComponent},
  {path:"list",component:TaskListComponent},
  {path:"form",component:TaskFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
