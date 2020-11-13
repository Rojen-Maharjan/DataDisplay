import { PlotPage } from './plot.page';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PinchZoomModule } from "ngx-pinch-zoom";
import { PlotPageRoutingModule } from './plot-routing.module';

@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    CommonModule,
    PinchZoomModule,
    PlotPageRoutingModule
  ],
  declarations: [PlotPage]
})
export class PlotPageModule { }
