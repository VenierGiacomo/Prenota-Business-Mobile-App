import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicesmodalPageRoutingModule } from './servicesmodal-routing.module';

import { ServicesmodalPage } from './servicesmodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicesmodalPageRoutingModule
  ],
  declarations: [ServicesmodalPage]
})
export class ServicesmodalPageModule {}
