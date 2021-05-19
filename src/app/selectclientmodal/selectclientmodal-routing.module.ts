import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectclientmodalPage } from './selectclientmodal.page';

const routes: Routes = [
  {
    path: '',
    component: SelectclientmodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectclientmodalPageRoutingModule {}
