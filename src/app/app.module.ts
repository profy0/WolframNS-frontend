import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterComponent } from './pages/register/register.component';
import { customInterceptor } from './services/custom.interceptor';
import { MainComponent } from './pages/main/main.component';
import { CalculationComponent } from './pages/calculation/calculation.component';
import { UserComponent } from './pages/user/user.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ChatComponent } from './pages/chat/chat.component';
import { AboutComponent } from './pages/about/about.component';
import { SimpleCalculationsComponent } from './pages/calculationPages/simple-calculations/simple-calculations.component';
import { MatrixComponent } from './pages/calculationPages/matrix/matrix.component';
import { TrigonometryComponent } from './pages/calculationPages/trigonometry/trigonometry.component';
import { ConversionComponent } from './pages/calculationPages/conversion/conversion.component';
import { PrivateChatComponent } from './pages/private-chat/private-chat.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    DashboardComponent,
    RegisterComponent,
    MainComponent,
    CalculationComponent,
    UserComponent,
    ChatComponent,
    AboutComponent,
    SimpleCalculationsComponent,
    MatrixComponent,
    TrigonometryComponent,
    ConversionComponent,
    PrivateChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: customInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
