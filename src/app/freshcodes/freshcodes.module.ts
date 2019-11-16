import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FreshcodesPageRoutingModule } from './freshcodes-routing.module';

import { FreshcodesPage } from './freshcodes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FreshcodesPageRoutingModule
  ],
  declarations: [FreshcodesPage]
})
export class FreshcodesPageModule {}
