import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OracionPageRoutingModule } from './oracion-routing.module';

import { OracionPage } from './oracion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OracionPageRoutingModule
  ],
  declarations: [OracionPage]
})
export class OracionPageModule {}
