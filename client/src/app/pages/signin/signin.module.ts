import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SigninRoutingModule } from './signin-routing.module';
import { SigninComponent } from './signin.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SigninComponent
  ],
  imports: [
    CommonModule,
    SigninRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class SigninModule { }
