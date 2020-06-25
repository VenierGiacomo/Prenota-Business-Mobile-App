import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { NativeApiService } from './nativeapi.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor(private router: Router, private apiNative: NativeApiService) { }
  
  async canActivate(route: ActivatedRouteSnapshot) {
    const token = this.apiNative.getToken()
    if (token) {
        var l = this.parseJwt(token) 
        var exp = 1000*l.exp
        var now = +new Date()
        if (now < exp){ 
            return true
        }
        else{
            this.router.navigateByUrl('/login');
            return false
        }
    } else {
        this.router.navigateByUrl('/login');
        return false
    }
}
parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
    };
}
