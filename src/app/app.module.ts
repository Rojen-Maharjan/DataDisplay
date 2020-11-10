import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { RouteReuseStrategy } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { BrowserModule } from "@angular/platform-browser";
import { SettingService } from "./services/setting.service";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    SettingService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
