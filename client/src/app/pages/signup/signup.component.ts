import { validarQueSeanIguales } from './signup.validator';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { timer } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserLoggedInService } from 'src/app/services/user-logged-in.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})


export class SignupComponent implements OnInit {

  formSignUp!: FormGroup;

  error = {
    error: false,
    visible: false,
    message: ""
  }

    
  constructor(private readonly fb: FormBuilder, private readonly userSvc: UserService, private readonly router: Router, private UserLoggedIn: UserLoggedInService,private cookieService: CookieService) { }
  
  ngOnInit(): void {
    this.formSignUp = this.initForm();
  }
  
  onValidar(): boolean{
    return this.formSignUp.get("password")?.value === this.formSignUp.get("passwordConfirm")?.value
  }

  onSubmit(): void{
    this.userSvc.signUpUser(this.formSignUp.value)
    .subscribe((res) => {
      
      window.localStorage.setItem("user", JSON.stringify(res))
      this.UserLoggedIn.isUser.next(window.localStorage.getItem("user"))
      this.cookieService.set("token", res.token)
      this.cookieService.set("id", res._id)
      this.error = {
        error: false,
        visible: true,
        message: "Successfully registered"
      }

      const contador = timer(3000);

      contador.subscribe(() => {
        this.error = {
          error: false,
          visible: false,
          message: ""
        }
        
        this.router.navigate(['/'])
      })

    }, error => {
      this.error = {
        error: true,
        visible: true,
        message: error.error
      }

      const contador = timer(3000);

      contador.subscribe(() => {
        this.error = {
          error: false,
          visible: false,
          message: ""
        }
      })
    })
    
  }

  initForm(): FormGroup{
    return this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^[a-zA-Z0-9_.+-]+$')]],
      // firstname: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ\s]{1,10}$')]],
      // lastname: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ\s]{1,10}$')]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required]],
    }, {
      validators: validarQueSeanIguales
    })
  }

  checarSiSonIguales(): any {
    return this.formSignUp.hasError('noSonIguales') &&
      this.formSignUp.get('password')?.dirty &&
      this.formSignUp.get('passwordConfirm')?.dirty;
  }

}
