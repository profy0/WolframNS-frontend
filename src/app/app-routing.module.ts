import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { RegisterComponent } from './pages/register/register.component';
import { MainComponent } from './pages/main/main.component';
import { CalculationComponent } from './pages/calculation/calculation.component';
import { UserComponent } from './pages/user/user.component';
import { ChatComponent } from './pages/chat/chat.component';
import { AboutComponent } from './pages/about/about.component';
import { SimpleCalculationsComponent } from './pages/calculationPages/simple-calculations/simple-calculations.component';
import { MatrixComponent } from './pages/calculationPages/matrix/matrix.component';
import { TrigonometryComponent } from './pages/calculationPages/trigonometry/trigonometry.component';
import { ConversionComponent } from './pages/calculationPages/conversion/conversion.component';
import { PrivateChatComponent } from './pages/private-chat/private-chat.component';

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
        component: CalculationComponent,
        children: [
          {
            path:'simple-calculations',
            component: SimpleCalculationsComponent
          },
          {
            path:'matrix-operations',
            component: MatrixComponent
          },
          {
            path:'trigonometry-operations',
            component: TrigonometryComponent
          },
          {
            path:'conversion-operations',
            component: ConversionComponent
          }
        ]
      },
      {
        path:'profile',
        component: UserComponent
      },
      {
        path:'chat',
        component: ChatComponent
      },
      {
        path:'about',
        component: AboutComponent
      }
      
    ]
  },
  {
    path:'private-chat',
    component: PrivateChatComponent
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
