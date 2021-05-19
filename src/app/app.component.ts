import { Component, NgZone, OnInit } from '@angular/core';

import { Platform, MenuController, NavController, AlertController, ToastController } from '@ionic/angular';
import { NativeApiService } from './services/nativeapi.service';
import { ApiService } from './services/api.service';
import { StorageService } from './services/storage.service';
import { Plugins, StatusBarStyle } from '@capacitor/core';


const { SplashScreen, StatusBar } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  read_only 
  password
  email

  constructor(
    private platform: Platform,
 
    public menuCtrl: MenuController,
    private nav: NavController,
    private apiNative: NativeApiService,
    private api: ApiService,
    private storage: StorageService,
    private toastController: ToastController,
    private alertController: AlertController,
    private ngZone: NgZone
    // private oneSignal: OneSignal
    
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.read_only= await this.storage.getreadPermission()
    if(this.read_only==null || this.read_only==undefined ){
      this.read_only=false
    }
  });
  StatusBar.setStyle({ style: StatusBarStyle.Light });

  // set status bar to white
  // this.statusBar.backgroundColorByHexString('#ffffff');
  // this.statusBar.
  setTimeout(() => {
    SplashScreen.hide();
  }, 500);

}



  async ngOnInit() {
    this.selectedIndex= 0
    const path = window.location.pathname
    if (path == '/clients' || path == 'clients'){
      this.selectedIndex= 1
    }else{
      if (path == '/online-appointment' || path == 'online-appointment'){
        this.selectedIndex= 2
      }else{
        this.selectedIndex= 0
      }
    }
    
  
  }

  
  async navigateClients(){
   
      // await this.menuCtrl.close();
    await this.nav.navigateRoot('/clients')
    // await this.menuCtrl.close();
    this.selectedIndex= 1
  }
  async tooggleRead(ev){
    ev.stopImmediatePropagation();
    ev.stopPropagation();
    ev.preventDefault();
    this.email =await this.storage.getEmail()
    if(this.read_only){
     
        this.askPassword()
      
      
     
     
    }else{
      this.read_only=!this.read_only
      await this.storage.setreadOnly(this.read_only)
    }
  
  }
  assistence(){
    window.location.href = 'https://wa.me/393404526854'
  }
  async navigateCalendar(){
   
      // await this.menuCtrl.close();
    await this.nav.navigateRoot('/calendar')
 
    this.selectedIndex= 0
  }
  async navigateOnlineAppointments(){
   
    // await this.menuCtrl.close();
  await this.nav.navigateRoot('/online-appointment')

  this.selectedIndex= 2
}
  // navigateNotifications(){
  //   this.selectedIndex= 1
  //   this.nav.navigateRoot('/notifications')
  // }
  // navigateScan(){
  //   this.selectedIndex= 2
  //   this.nav.navigateRoot('/scan')
  // }
  async close(){
    await this.menuCtrl.close();
  }

  async askPassword(){

    const alert = await this.alertController.create({
      header: 'Password',
      message: "Per disabilitare la modalità di solo lettura devi inserire la password",
      inputs: [
        {
          name: 'password',
          type: 'password',
          placeholder: '*********'
        },
       
      ],
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.ngZone.run(async ()=>{
            this.read_only=true
            await this.close()
            await this.storage.setreadOnly(this.read_only)
            await this.nav.navigateRoot('/calendar')
            setTimeout(() => {
              this.presentToast('Modalità lettura')
            },500 
            );
            })
          
          }
        }, {
          text: 'Continua',
          handler: (data) => {
            if(this.platform.is('hybrid')){
              this.ngZone.run(async ()=>{
                let params = {
                      "email": this.email,
                      "password": data.password,
                    }
                    this.apiNative.loginread(params).then(async  (res)=>{
                      if(res.non_field_errors){
                        this.presentToast('Email e Password non combaciano')
                        await this.storage.setreadOnly(true)
                        this.read_only=true
                        
                      }else{
                        this.read_only=false
                        await this.close()
                        await this.storage.setreadOnly(this.read_only)
                        await this.nav.navigateRoot('/calendar')
                        setTimeout(() => {
                          this.presentToast('Modifiche attive')
                        },500 
                        );
                      
                       
                        
                      }
                      
                    }).catch(async ()=>{  
                      await this.storage.setreadOnly(true)
                      this.read_only=true
                      
                      this.presentToast('Email e Password non combaciano')})
              
              })

            }else{
              this.ngZone.run(async ()=>{
                    this.api.login(this.email,data.password).subscribe(async  (res)=>{
                      if(res.non_field_errors){
                        this.presentToast('Email e Password non combaciano')
                        await this.storage.setreadOnly(true)
                        this.read_only=true
                        
                      }else{
                        this.read_only=false
                        await this.close()
                        await this.storage.setreadOnly(this.read_only)
                        await this.nav.navigateRoot('/calendar')
                        setTimeout(() => {
                          this.presentToast('Modifiche attive')
                        },500 
                        );
                      
                       
                        
                      }
                      
                    },async ()=>{  
                      await this.storage.setreadOnly(true)
                      this.read_only=true
                      
                      this.presentToast('Email e Password non combaciano')})
              
              })
            }
            
        }
        }
      ]
    });

    await alert.present();
  

  }
  
  async logout(){

    this.selectedIndex= 0
  if (this.platform.is('hybrid')){
    await this.apiNative.deleteStorage()
    await this.nav.navigateBack('login')
    await this.menuCtrl.close();
  }else{
    await this.api.deleteStorage()
    await this.nav.navigateBack('login')
    await this.menuCtrl.close();
  }
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
