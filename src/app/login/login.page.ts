import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NavController, Platform } from '@ionic/angular';
import { NativeApiService } from '../services/nativeapi.service';
import { HTTP, HTTPResponse } from '@ionic-native/http/ngx';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
email=''
password=''
error= ''
sizeElement:number
sizeElement1:number
BASE_URL = 'https://giacomovenier.pythonanywhere.com/api/'
httpheader = new HttpHeaders({'Content-type':'application/json'}) //'Access-Control-Allow-Origin':'*'
  constructor(private api: ApiService, private nav: NavController, private plt: Platform, private nativeApi: NativeApiService, private http:HTTP){}

  ngOnInit() {
    this.sizeElement = this.plt.height()/100*15;
    this.sizeElement1 = this.sizeElement*2
  }

  async login(){
    if (this.plt.is('hybrid')) {
      let url = this.BASE_URL+'auth/';
      let params = {
        "email": this.email,
        "password": this.password,
      }
      let headers = { };
      this.http.setDataSerializer("json");
      this.http.setHeader("prenotaApp","Accept", "application/json");
      this.http.setHeader("prenotaApp","Content-Type", "application/json");
      this.http.post(url, params, headers)
  .then((response:HTTPResponse) => {
    var res = JSON.parse(response.data)
    this.nativeApi.storeToken(res.token)
    this.nav.navigateForward('folder/Inbox')
  })
  .catch((error:any) => {
    this.error = 'La password o la email che hai inserito non sono valide'
  });
      
    } else {
      this.api.login(this.email, this.password).subscribe(
        data =>{
          this.api.storeToken(data.token)
          this.nav.navigateForward('folder/Inbox')
        },err =>{
          this.error = 'La password o la email che hai inserito non sono valide'
        })
    }
    
  }
}
