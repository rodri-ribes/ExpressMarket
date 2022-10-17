import { JwtInterceptorInterceptor } from './interceptors/jwt-interceptor.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { SearchComponent } from './components/search/search.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { SellComponent } from './components/sell/sell.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ExtraDataComponent } from './components/sell/extra-data/extra-data.component';
import { CardProductComponent } from './components/card-product/card-product.component';
import { HomeComponent } from './pages/home/home.component';
import { MyProductsComponent } from './components/my-products/my-products.component';
import { CardMyProductComponent } from './components/card-my-product/card-my-product.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchComponent,
    FooterComponent,
    ProfileSettingsComponent,
    QuestionsComponent,
    SellComponent,
    ExtraDataComponent,
    CardProductComponent,
    HomeComponent,
    MyProductsComponent,
    CardMyProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
