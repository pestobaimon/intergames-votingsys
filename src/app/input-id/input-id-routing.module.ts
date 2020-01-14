import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InputIdPage } from './input-id.page';

const routes: Routes = [
  {
    path: '',
    component: InputIdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InputIdPageRoutingModule {}
