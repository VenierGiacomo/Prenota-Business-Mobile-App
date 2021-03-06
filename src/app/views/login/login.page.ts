import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { NativeApiService } from '../../services/nativeapi.service';
import Notiflix from "notiflix";
import { Plugins } from '@capacitor/core';

import { StorageService } from '../../services/storage.service';

const { Browser } = Plugins;
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
showPassword=true
psw_txt='Nascondi password'
  constructor(private toastController: ToastController, private storage: StorageService, private api: ApiService, private nav: NavController, private plt: Platform, private nativeApi: NativeApiService, ){
    this.plt.ready().then(async ()=>{await this.nativeApi.deleteStorage(); await this.api.deleteStorage()})
  }

  ngOnInit() {
    
  }
  toggleShow() {
    var password_input:any = document.getElementById('input')
    password_input.type = password_input.type === 'password' ?  'text' : 'password';
    this.showPassword = !this.showPassword;
    if(password_input.type==='password'){
      this.psw_txt='Mostra password'
    }else{
      this.psw_txt='Nacondi password'
    }


  }
  
  // async login(){
  //   if (this.plt.is('hybrid')) {
  //     let url = this.BASE_URL+'auth/';
  //     let params = {
  //       "email": this.email,
  //       "password": this.password,
  //     }
  //     let headers = { };
  //     this.http.setDataSerializer("json");
  //     this.http.setHeader("prenotaApp","Accept", "application/json");
  //     this.http.setHeader("prenotaApp","Content-Type", "application/json");
  //     this.http.post(url, params, headers)
  // .then(async (response:HTTPResponse) => {
    
  //   var res = JSON.parse(response.data)
  //   this.nativeApi.storeToken(res.token)
  //         this.nativeApi.hasStore().then(
  //           async data=>{
  //             var res:any = await data
  //             if(res.has_store==undefined){
  //               await this.storage.setStore(res)
  //               this.nav.navigateForward('calendar')
  //             }else{
  //               Notiflix.Report.Failure( 
  //                 'Non sei un proprietario', 
  //                 "Per usare quest'app devi essere un proprietario",
  //                 'Ok' )
              
  //             }
             
  //           }).catch((error:any) => {
  //             this.error = 'La password o la email che hai inserito non sono valide'
  //           });
  // })
  // .catch((error:any) => {
  //   this.error = 'La password o la email che hai inserito non sono valide'
  // });
      
  //   } else {
  //     this.api.login(this.email, this.password).subscribe(
  //       async data =>{
  //         this.api.storeToken(data.token)
  //         this.api.hasStore().subscribe(
  //           async data=>{
  //             var res:any = await data
  //             if(res.has_store==undefined){
  //               await this.storage.setStore(res)
                
  //               this.nav.navigateForward('calendar')
  //             }else{
  //               Notiflix.Report.Failure( 
  //                 'Non sei un proprietario', 
  //                 "Per usare quest'app devi essere un proprietario",
  //                 'Ok' )
              
  //             }
             
  //           },
  //           err => {
  //             this.error = 'La password o la email che hai inserito non sono valide'
  //           })}
  //         ,err =>{
  //         this.error = 'La password o la email che hai inserito non sono valide'
  //       })
  //   }
    
  // }
  async login(){
    if (this.plt.is('hybrid')) {
    
      let params = {
        "email": this.email,
        "password": this.password,
      }

      this.nativeApi.login(params).then(async  (res)=>{
        await this.storage.setEmail(this.email)
        if(res.non_field_errors){
          this.presentToast('Email e Password non combaciano')
        }else{
          this.nativeApi.hasStore().then(async (data)=>{
            var res:any = data
            if(res.has_store==undefined){
                await this.storage.setStore(res)
                this.nav.navigateForward('calendar')
            }
            else{
                    Notiflix.Report.Failure( 
                      'Non sei un proprietario', 
                      "Per usare quest'app devi essere un proprietario",
                      'Ok' )   
            }
          })
        }
      }).catch((error:any) => {
        this.presentToast('Email e Password non combaciano ')
      
      });
      
    } else {
      this.api.login(this.email, this.password).subscribe(
        async data =>{

          await this.storage.setEmail(this.email)
          this.api.storeToken(data.token)
          this.api.hasStore().subscribe(
            async data=>{
              var res:any = await data
              if(res.has_store==undefined){
                // console.log(data,res)
                await this.storage.setStore(res)
                
                this.nav.navigateForward('calendar')
              }else{
                Notiflix.Report.Failure( 
                  'Non sei un proprietario', 
                  "Per usare quest'app devi essere un proprietario",
                  'Ok' )
              
              }
             
              
            },err =>{
              console.log(err)
              Notiflix.Notify.Init({ position:"center-bottom"}); 
             this.presentToast('Email e Password non combaciano')
              this.error = 'La password o la email che hai inserito non sono valide'
            })
        },err =>{
          console.log(err)
          Notiflix.Notify.Init({ position:"center-bottom"}); 
         this.presentToast('Email e Password non combaciano')
          this.error = 'La password o la email che hai inserito non sono valide'
        })
    }
    
  }
  async changePassword(){
    await Browser.open({ url: 'https://giacomovenier.pythonanywhere.com/api/auth/reset_password' })
  }
  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: 'top',
      duration: 4000,
      cssClass:'toast-class',
    });
    toast.present();
  }
}
