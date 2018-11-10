import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products/products.component';
import { ProductsPipe } from './products/products.pipe';
import { RatingComponent } from './products/rating/rating.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { DetailComponent } from './products/detail/detail.component';
import { LoginComponent } from './auth/login/login.component';
import { NavigationComponent } from './home/navigation/navigation.component';
import {RouterModule, ActivatedRoute} from '@angular/router';
import {AuthService} from './auth/auth.service';
import {CookieService} from 'ngx-cookie-service';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AuthinterceptorService } from './auth/authinterceptor.service';
import { TemplateComponent } from './forms/template/template.component';
import { ReactiveComponent } from './forms/reactive/reactive.component';




@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductsPipe,
    RatingComponent,
    WelcomeComponent,
    DetailComponent,
    LoginComponent,
    NavigationComponent,
    TemplateComponent,
    ReactiveComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:"home",component:WelcomeComponent },
      {path:"products",component:ProductsComponent},
      {path:"products/:id",component:DetailComponent},
      {path:"login", component:LoginComponent},
      {path:"template",component:TemplateComponent},
      {path:"reactive",component:ReactiveComponent},
      {path:"",redirectTo:"home",pathMatch:"full"},
      {path:"**",redirectTo:"login"}
    ])
  ],
  providers: [AuthService,CookieService,  
    {
      provide: HTTP_INTERCEPTORS,
      useClass:AuthinterceptorService,
      multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
