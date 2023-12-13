import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CollaborePageRoutingModule } from './collabore-routing.module';

import { CollaborePage } from './collabore.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CollaborePageRoutingModule
  ],
  declarations: [CollaborePage]
})
export class CollaborePageModule {}
