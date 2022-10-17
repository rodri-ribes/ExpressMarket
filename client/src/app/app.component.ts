import { Component, OnInit } from '@angular/core';
import { UserLoggedInService } from './services/user-logged-in.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = 'client';

  constructor(private UserLoggedIn: UserLoggedInService){}

  ngOnInit(): void {

    this.UserLoggedIn.isUser.next(window.localStorage.getItem("user"))
  }
  

}
