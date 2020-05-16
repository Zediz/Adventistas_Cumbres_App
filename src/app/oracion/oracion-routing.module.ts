import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OracionPage } from './oracion.page';

const routes: Routes = [
  {
    path: '',
    component: OracionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OracionPageRoutingModule {}
