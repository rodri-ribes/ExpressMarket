import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserLoggedInService {

  isUser = new BehaviorSubject<any>(window.localStorage.getItem("user"))
  // isUser = new BehaviorSubject<any>(this.cookieService.get("id"))
  
  constructor(private cookieService: CookieService) { }

  getData(): any{
    // let token = window.localStorage.getItem("user")
    let token = this.isUser
    
    return this.isUser
  }
}
