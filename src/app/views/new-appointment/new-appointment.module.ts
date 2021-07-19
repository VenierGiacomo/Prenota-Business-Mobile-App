import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewAppointmentPageRoutingModule } from './new-appointment-routing.module';

import { NewAppointmentPage } from './new-appointment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewAppointmentPageRoutingModule
  ],
  declarations: [NewAppointmentPage]
})
export class NewAppointmentPageModule {}
