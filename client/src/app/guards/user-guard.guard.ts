import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuardGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkIsUser();
  }

  constructor(private cookieService: CookieService, private route: Router){}

  checkIsUser(): boolean {
    if(this.cookieService.get("token")){
      return true
    }else{
      this.route.navigateByUrl("/signin")
      return false
    }
  }
  
}
