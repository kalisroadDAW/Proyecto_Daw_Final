import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageRegisterComponent } from './pages/page-register/page-register.component';
import { PageUserEditComponent } from './pages/page-user-edit/page-user-edit/page-user-edit.component';
import { PageUsersComponent } from './pages/users/page-users/page-users.component';

const routes: Routes = [
  
  {path: 'login', component: PageLoginComponent},
  {path: 'register', component: PageRegisterComponent},
  {path: 'gente/:page', component: PageUsersComponent},
  {path: 'gente', component: PageUsersComponent},
  {path: 'mis-datos', component: PageUserEditComponent},


  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
