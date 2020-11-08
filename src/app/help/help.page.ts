import { NavController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-help",
  templateUrl: "./help.page.html",
  styleUrls: ["./help.page.scss"],
})
export class HelpPage implements OnInit {
  constructor(private nav: NavController) {}

  ngOnInit() {}

  goBack() {
    this.nav.back();
  }
}
