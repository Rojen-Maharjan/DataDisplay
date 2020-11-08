import { Chart } from "chart.js";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-test",
  templateUrl: "./test.page.html",
  styleUrls: ["./test.page.scss"],
})
export class TestPage implements OnInit {
  @ViewChild("chartContext") chartContext: ElementRef;

  constructor() {}

  ngOnInit() {}
  ionViewDidEnter() {
    let lineChart = new Chart(this.chartContext.nativeElement, {
      type: "line",
      data: {
        labels: [1, 2, 3, 4, 5],
        datasets: [
          {
            label: "",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [1, 2, 3, 4, 5],
            spanGaps: false,
          },
        ],
      },
    });
  }
}
