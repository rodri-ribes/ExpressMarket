import { Component, OnInit, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { UserLoggedInService } from 'src/app/services/user-logged-in.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})


export class NavbarComponent implements OnInit {

  constructor(private UserLoggedIn: UserLoggedInService,
    private cookieService: CookieService) { }

  open: boolean = false
  
  user: any = this.UserLoggedIn.isUser.getValue()
  

  ngOnInit(): void {
    this.UserLoggedIn.isUser.subscribe(c => {
      this.user = c
    })
  }

  OnLogout(): void{
    this.UserLoggedIn.isUser.next(null)
    this.user = null
    window.localStorage.removeItem("user")
    this.cookieService.delete("id")
    this.cookieService.delete("token")
  }

  onClick(): void{
    this.open = !this.open
  }
}
