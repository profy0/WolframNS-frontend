import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { RegisterComponent } from './pages/register/register.component';
import { MainComponent } from './pages/main/main.component';
import { CalculationComponent } from './pages/calculation/calculation.component';
import { UserComponent } from './pages/user/user.component';

const routes: Routes = [
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'registration',
    component: RegisterComponent
  },
  {
    path:'',
    component: LayoutComponent,
    children: [
      {
        path:'dashboard',
        component: DashboardComponent
      },
      {
        path:'main',
        component: MainComponent
      },
      {
        path:'calculations',
        component: CalculationComponent
      },
      {
        path:'profile',
        component: UserComponent
      }
    ]
  },
  {
    path:'',
    redirectTo:'main',
    pathMatch:'full'
  },
  
  {
    path:'**',
    component: MainComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
