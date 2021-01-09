import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeditacionesPage } from './meditaciones.page';

const routes: Routes = [
  {
    path: '',
    component: MeditacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeditacionesPageRoutingModule {}
