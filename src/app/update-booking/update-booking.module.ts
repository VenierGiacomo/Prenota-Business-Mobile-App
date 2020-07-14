import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateBookingPageRoutingModule } from './update-booking-routing.module';

import { UpdateBookingPage } from './update-booking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateBookingPageRoutingModule
  ],
  declarations: [UpdateBookingPage]
})
export class UpdateBookingPageModule {}
