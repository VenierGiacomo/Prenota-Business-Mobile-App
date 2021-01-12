import { Component, OnInit } from '@angular/core';

import { Platform, MenuController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NativeApiService } from './services/nativeapi.service';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public menuCtrl: MenuController,
    private nav: NavController,
    private apiNative: NativeApiService,
    private api: ApiService,
    // private oneSignal: OneSignal
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
         //Remove this method to stop OneSignal Debugging 
    // this.oneSignal.setLogLevel({logLevel: 6, visualLevel: 0});
    
    // var notificationOpenedCallback = function(jsonData) {
    //   console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    // };
    
    // // Set your iOS Settings
    // var iosSettings = {};
    // iosSettings["kOSSettingsKeyAutoPrompt"] = false;
    // iosSettings["kOSSettingsKeyInAppLaunchURL"] = false;
    
    // this.oneSignal
    //   .startInit("b6e8e712-c4da-4a04-9379-1a3045d3ebdb")
    //   .handleNotificationOpened(notificationOpenedCallback)
    //   .iOSSettings(iosSettings)
    //   .inFocusDisplaying(window["plugins"].OneSignal.OSInFocusDisplayOption.Notification)
    //   .endInit();
    
    // // The promptForPushNotificationsWithUserResponse function will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 6)
    // this.oneSignal.promptForPushNotificationsWithUserResponse().then(function(accepted) {
    //   console.log("User accepted notifications: " + accepted);
    // });
  });
  // this.oneSignal.handleNotificationOpened().subscribe(data => {
  // this.nav.navigateRoot("/notifications")
  // });
}
//       this.oneSignal.setLogLevel({logLevel: 6, visualLevel: 4});
//     this.oneSignal.startInit('b6e8e712-c4da-4a04-9379-1a3045d3ebdb');
   
//     this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

// this.oneSignal.handleNotificationReceived().subscribe(data => {
//  // do something when notification is received
//  console.log(data)
// });


// this.oneSignal.endInit();


  ngOnInit() {
    this.selectedIndex= 0
    // const path = window.location.pathname
    // if (path == '/notifications' || path == 'notifications'){
    //   this.selectedIndex= 1
    // }else{
    //   if (path == '/scan' || path == 'scan'){
    //     this.selectedIndex= 2
    //   }else{
    //     this.selectedIndex= 0
    //   }
      
    // }
  
  }
  assistence(){
    window.location.href = 'https://wa.me/393404526854'
  }
  navigateCalendar(){
    this.selectedIndex= 0
    this.nav.navigateRoot('/calendar')
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
  async logout(){
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
}
