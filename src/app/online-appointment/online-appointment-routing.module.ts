import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnlineAppointmentPage } from './online-appointment.page';

const routes: Routes = [
  {
    path: '',
    component: OnlineAppointmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnlineAppointmentPageRoutingModule {}
