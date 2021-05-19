import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectclientmodalPageRoutingModule } from './selectclientmodal-routing.module';

import { SelectclientmodalPage } from './selectclientmodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectclientmodalPageRoutingModule
  ],
  declarations: [SelectclientmodalPage]
})
export class SelectclientmodalPageModule {}
