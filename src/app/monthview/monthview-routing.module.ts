import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonthviewPage } from './monthview.page';

const routes: Routes = [
  {
    path: '',
    component: MonthviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonthviewPageRoutingModule {}
