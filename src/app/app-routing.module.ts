import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginDashComponent } from './component/login-dash/login-dash.component';
import { RegistrationDashComponent } from './component/registration-dash/registration-dash.component';
import { HomeComponent } from './component/home/home.component';
import { BusinessDashComponent } from './component/business-dash/business-dash.component';

const routes: Routes = [
  {path:"", component:LoginDashComponent},
  {path:"reg", component:RegistrationDashComponent},
  {path:"home", component:HomeComponent},
  {path:"business", component:BusinessDashComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
