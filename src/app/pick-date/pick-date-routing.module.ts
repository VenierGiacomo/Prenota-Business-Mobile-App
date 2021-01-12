import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PickDatePage } from './pick-date.page';

const routes: Routes = [
  {
    path: '',
    component: PickDatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PickDatePageRoutingModule {}
