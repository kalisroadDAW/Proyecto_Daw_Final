import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PicsComponent } from './components/pics/pics.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { MessageComponent } from './pages/message/message.component';

import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageRegisterComponent } from './pages/page-register/page-register.component';
import { PageUserEditComponent } from './pages/page-user-edit/page-user-edit/page-user-edit.component';
import { PageUsersComponent } from './pages/users/page-users/page-users.component';

const routes: Routes = [
  
  {path: 'login', component: PageLoginComponent},
  {path: 'register', component: PageRegisterComponent},
  {path: 'gente/:page', component: PageUsersComponent},
  {path: 'gente', component: PageUsersComponent},
  {path: 'timeline', component: TimelineComponent},
  {path: 'mis-datos', component: PageUserEditComponent},
  {path: 'pictures', component: PicsComponent},
  {path: 'user/:id', component: ProfileComponent},
  {path: 'messages', component: MessageComponent},
  {path: '', component: PageLoginComponent},
 


  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
