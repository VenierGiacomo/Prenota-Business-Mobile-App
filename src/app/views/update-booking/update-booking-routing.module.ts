import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateBookingPage } from './update-booking.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateBookingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateBookingPageRoutingModule {}
