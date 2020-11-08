import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { TestPageRoutingModule } from "./test-routing.module";

import { TestPage } from "./test.page";
import { PinchZoomModule } from "ngx-pinch-zoom";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PinchZoomModule,
    TestPageRoutingModule,
  ],
  declarations: [TestPage],
})
export class TestPageModule {}
