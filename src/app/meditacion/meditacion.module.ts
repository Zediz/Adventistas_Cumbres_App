import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeditacionPageRoutingModule } from './meditacion-routing.module';

import { MeditacionPage } from './meditacion.page';
import { LoadingComponent } from '../components/loading/loading.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeditacionPageRoutingModule
  ],
  declarations: [MeditacionPage, LoadingComponent]
})
export class MeditacionPageModule {}
