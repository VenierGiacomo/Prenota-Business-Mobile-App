import { NgModule, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { HTTP } from '@ionic-native/http/ngx';
import 'hammerjs'
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { HammerModule } from '@angular/platform-browser';
import * as Hammer from 'hammerjs';
import { PopovercallComponent } from './popovercall/popovercall.component';
import { AuthguardService } from './services/authguard.service';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Badge } from '@ionic-native/badge/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { FormsModule } from '@angular/forms';
@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
    buildHammer(element: HTMLElement): any {
      return new Hammer(element, {
        swipe: { direction: Hammer.DIRECTION_ALL }
      });
   }
}

@NgModule({
  declarations: [AppComponent,PopovercallComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot({
      mode: 'ios'}),
    AppRoutingModule,
    HttpClientModule,
    HammerModule
  ],
  providers: [
    StatusBar,
    OneSignal,
    HTTP,
    SMS,
    Badge,
    SplashScreen,
    {provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthguardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
