import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvitaModalPage } from './invita-modal.page';

const routes: Routes = [
  {
    path: '',
    component: InvitaModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvitaModalPageRoutingModule {}
