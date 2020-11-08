import { File } from "@ionic-native/file/ngx";
import { MenuController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";
import { NavController, Platform } from "@ionic/angular";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { SettingService } from "./services/setting.service";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
  providers: [File],
})
export class AppComponent implements OnInit {
  constructor(
    public file: File,
    public ss: SettingService,
    private platform: Platform,
    private nav: NavController,
    private menu: MenuController,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.createFolderIfNotExist();
      setTimeout(() => {
        this.splashScreen.hide();
      }, 2000);
    });
  }

  ngOnInit() {}

  createFolderIfNotExist() {
    this.file
      .checkDir(this.file.externalRootDirectory, this.ss.excelFolderName)
      .then((_) => console.log("Directory exists"))
      .catch((err) => {
        this.file
          .createDir(
            this.file.externalRootDirectory,
            this.ss.excelFolderName,
            false
          )
          .then((r) => {
            console.log("Directory created : ", this.ss.excelFolderName);
          })
          .catch((err) => {
            console.log(err);
          });
      });
  }

  gotoHome() {
    this.menu.close();
    this.nav.navigateRoot("home");
  }

  gotoSetting() {
    this.menu.close();
    this.nav.navigateRoot("setting");
  }

  gotoHelp() {
    this.menu.close();
    this.nav.navigateRoot("help");
  }
}
