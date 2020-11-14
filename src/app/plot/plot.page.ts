import { Chart } from 'chart.js';
import { MenuController } from '@ionic/angular';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.page.html',
  styleUrls: ['./plot.page.scss'],
})

export class PlotPage implements OnInit {
  @ViewChild("context") context: ElementRef;

  plots: Array<ChartData> = [];
  x: String;
  y: Number;

  constructor(
    private menu: MenuController
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initializeChartData();
  }

  onReset() {
    this.plots = [];
    this.initializeChartData();
  }

  initializeChartData() {
    let xData = [];
    let yData = [];
    this.plots.forEach(item => {
      xData.push(item.x);
      yData.push(item.y);
    });
    this.getLineChart(xData, yData);
  }

  getLineChart(xData, yData) {
    return new Chart(this.context.nativeElement, {
      type: "line",
      options: {
        legend: {
          display: true,
          position: "bottom",
        },
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "",
              },
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
      data: {
        labels: xData,
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
            data: yData,
            spanGaps: false,
          },
        ],
      },
    });
  }

  openMenu() {
    this.menu.open();
  }

  onPlotAction() {
    if (!(this.x && this.y)) { return; }
    this.plots.push({
      x: this.x,
      y: this.y,
    });
    delete this.x;
    delete this.y;
    this.initializeChartData();

  }
}

interface ChartData { x, y };
