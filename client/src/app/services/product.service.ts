import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { UserLoggedInService } from './user-logged-in.service';
import { Observable, Subject, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  


  constructor(private Http: HttpClient, private readonly isUser: UserLoggedInService, private cookieService: CookieService) { }

  private readonly API = environment.api

  createProduct(body: any): Observable<Product>{
    
    return this.Http.post<Product>(`${this.API}/product/add`, body)
  }

  getProducts(): Observable<Product[]>{
    
    return this.Http.get<Product[]>(`${this.API}/product/getall`, {
        headers: {'x-access-token': this.cookieService.get("token")}
    })
  }

  getMyProducts(): Observable<Product[]>{
    
    return this.Http.get<Product[]>(`${this.API}/product/getmyproducts/${this.cookieService.get("id")}`, {
        headers: {'x-access-token': this.cookieService.get("token")}
    })
  }
  
  removeProduct(id: string): Observable<string>{
    
    return this.Http.delete<string>(`${this.API}/product/remove/${id}`, {
        headers: {'x-access-token': this.cookieService.get("token")}
    })
  }
  
}
