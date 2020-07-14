import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { ApiService } from './api.service';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor(private nav: NavController, private plt: Platform, private api: ApiService, private storage: Storage) { }
  
  async canActivate(route: ActivatedRouteSnapshot) {
    if (this.plt.is('hybrid')) {
        const token_data =  JSON.parse( await this.storage.get('token'))
        if (token_data != null|| token_data != undefined) {
            var l = await this.parseJwt(token_data.token) 
            var exp = await 1000*l.exp
            var now = +new Date()
            if (now < exp){ 
                return true
            }
            else{
                this.nav.navigateBack('login');
                return false
            }
        } else {
            this.nav.navigateBack('login');
            return false
        }
        } else{
            const token_data =  await JSON.parse(localStorage.getItem('token'))
            if (token_data != null|| token_data != undefined) {
                var l = await this.parseJwt(token_data.token) 
                var exp = 1000*l.exp
          
                var now = +new Date()
                if (now < exp){ 
                    return true
                }
                else{
                    this.nav.navigateBack('login');
                    return false
                }
            } else {
                this.nav.navigateBack('login');
                return false
            }
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
