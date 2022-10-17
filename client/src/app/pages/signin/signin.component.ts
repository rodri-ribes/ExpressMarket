import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { timer } from 'rxjs';
import { UserLoggedInService } from 'src/app/services/user-logged-in.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  formSignUp!: FormGroup;

  error = {
    error: false,
    visible: false,
    message: ""
  }

  constructor(private readonly fb: FormBuilder,
    private readonly userSvc: UserService,
    private readonly router: Router,
    private UserLoggedIn: UserLoggedInService,
    private cookieService: CookieService
    ) { }



  ngOnInit(): void {
    this.formSignUp = this.initForm();
  }
  
  onSubmit(): void{
    this.userSvc.signInUser(this.formSignUp.value)
    .subscribe((res) => {

      window.localStorage.setItem("user", JSON.stringify(res))
      this.UserLoggedIn.isUser.next(window.localStorage.getItem("user"))
      this.cookieService.set("token", res.token)
      this.cookieService.set("id", res._id)
      
      this.error = {
        error: false,
        visible: true,
        message: "Successfully logged in"
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
      console.log(this.error)
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
      usernameOrEmail: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

}
