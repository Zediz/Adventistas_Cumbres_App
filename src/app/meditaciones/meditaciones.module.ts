import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeditacionesPageRoutingModule } from './meditaciones-routing.module';

import { MeditacionesPage } from './meditaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeditacionesPageRoutingModule
  ],
  declarations: [MeditacionesPage]
})
export class MeditacionesPageModule {}
