import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PickDatePageRoutingModule } from './pick-date-routing.module';

import { PickDatePage } from './pick-date.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PickDatePageRoutingModule
  ],
  declarations: [PickDatePage]
})
export class PickDatePageModule {}
