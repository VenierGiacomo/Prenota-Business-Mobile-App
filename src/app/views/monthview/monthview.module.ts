import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MonthviewPageRoutingModule } from './monthview-routing.module';

import { MonthviewPage } from './monthview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MonthviewPageRoutingModule
  ],
  declarations: [MonthviewPage]
})
export class MonthviewPageModule {}
