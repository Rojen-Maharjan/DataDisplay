import { NavController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-setting",
  templateUrl: "./setting.page.html",
  styleUrls: ["./setting.page.scss"],
})
export class SettingPage implements OnInit {
  constructor(private nav: NavController) {}

  ngOnInit() {}

  goBack() {
    this.nav.back();
  }
}
