import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnlineAppointmentPageRoutingModule } from './online-appointment-routing.module';

import { OnlineAppointmentPage } from './online-appointment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnlineAppointmentPageRoutingModule
  ],
  declarations: [OnlineAppointmentPage]
})
export class OnlineAppointmentPageModule {}
