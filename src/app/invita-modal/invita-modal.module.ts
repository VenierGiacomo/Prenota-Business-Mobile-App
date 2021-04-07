import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvitaModalPageRoutingModule } from './invita-modal-routing.module';

import { InvitaModalPage } from './invita-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvitaModalPageRoutingModule
  ],
  declarations: [InvitaModalPage]
})
export class InvitaModalPageModule {}
