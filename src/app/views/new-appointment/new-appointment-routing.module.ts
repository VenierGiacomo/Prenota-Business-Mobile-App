import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewAppointmentPage } from './new-appointment.page';

const routes: Routes = [
  {
    path: '',
    component: NewAppointmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewAppointmentPageRoutingModule {}
