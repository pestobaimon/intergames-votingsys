import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FreshcodesPage } from './freshcodes.page';

const routes: Routes = [
  {
    path: '',
    component: FreshcodesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FreshcodesPageRoutingModule {}
