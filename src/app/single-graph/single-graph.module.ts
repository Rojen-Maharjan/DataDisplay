import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PinchZoomModule } from "ngx-pinch-zoom";
import { SingleGraphPage } from './single-graph.page';
import { SingleGraphPageRoutingModule } from './single-graph-routing.module';

@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    CommonModule,
    PinchZoomModule,
    SingleGraphPageRoutingModule
  ],
  declarations: [SingleGraphPage]
})
export class SingleGraphPageModule { }
