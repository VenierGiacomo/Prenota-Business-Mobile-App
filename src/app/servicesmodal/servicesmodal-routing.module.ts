import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicesmodalPage } from './servicesmodal.page';

const routes: Routes = [
  {
    path: '',
    component: ServicesmodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesmodalPageRoutingModule {}
