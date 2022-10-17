import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserIsLoginGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userIsloggin();
  }
  constructor(private cookieService: CookieService, private route: Router){}

  userIsloggin(): boolean{
    if(this.cookieService.get("id")){
      this.route.navigateByUrl("/")
      return false
    }else{
      return true
    }
  }
}
