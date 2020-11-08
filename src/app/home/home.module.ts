import { HomePage } from "./home.page";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { PinchZoomModule } from "ngx-pinch-zoom";
import { HomePageRoutingModule } from "./home-routing.module";

@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    CommonModule,
    PinchZoomModule,
    HomePageRoutingModule,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
