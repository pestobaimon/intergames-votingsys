import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InputIdPageRoutingModule } from './input-id-routing.module';

import { InputIdPage } from './input-id.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InputIdPageRoutingModule
  ],
  declarations: [InputIdPage]
})
export class InputIdPageModule {}
