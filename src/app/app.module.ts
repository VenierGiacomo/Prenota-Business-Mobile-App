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
import { CallNumber } from '@ionic-native/call-number/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { HTTP } from '@ionic-native/http/ngx';
import 'hammerjs'
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { HammerModule } from '@angular/platform-browser';
import * as Hammer from 'hammerjs';
import { PopovercallComponent } from './popovercall/popovercall.component';

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
    BrowserAnimationsModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    HammerModule
  ],
  providers: [
    StatusBar,
    CallNumber,
    HTTP,
    SplashScreen,
    {provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
