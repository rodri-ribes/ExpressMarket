import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface User{
  _id: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  image: string;
  phone: number;
  cash: number;
  buy: object[];
  products: object[];
  ban: boolean;
  rol: string;
  token: string
}


@Injectable({
  providedIn: 'root'
})


export class UserService {

  private readonly API = environment.api
  constructor(private readonly http: HttpClient) { }

  signUpUser(user: User): Observable<User>{
    return this.http.post<User>(`${this.API}/user/signup`, user)
  }

  signInUser(user: User): Observable<User>{
    return this.http.post<User>(`${this.API}/user/signin`, user)
  }
  
  // getUser(): Observable<User>{
  //   return this.http.get<User>(this.API)

  // }
  // updateUser(user: User): Observable<void>{

  // }

}
