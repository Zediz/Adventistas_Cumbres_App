import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnvivoPageRoutingModule } from './envivo-routing.module';

import { EnvivoPage } from './envivo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnvivoPageRoutingModule
  ],
  declarations: [EnvivoPage]
})
export class EnvivoPageModule {}
