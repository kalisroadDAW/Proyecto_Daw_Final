import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageRegisterComponent } from './pages/page-register/page-register.component';

import { PageUserEditComponent } from './pages/page-user-edit/page-user-edit/page-user-edit.component';
import { PageUsersComponent } from './pages/users/page-users/page-users.component';
import { SidebarComponent } from './components/sidebar/sidebar/sidebar.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { MomentModule } from 'ngx-moment';




@NgModule({
  declarations: [
    AppComponent,
    PageLoginComponent,
    PageRegisterComponent,
    

    PageUserEditComponent,
    PageUsersComponent,
    SidebarComponent,
    TimelineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MomentModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
