import * as XLSX from "xlsx";
import { Chart } from "chart.js";
import { File } from "@ionic-native/file/ngx";
import { IonSlides, MenuController } from "@ionic/angular";
import { SettingService } from "../services/setting.service";
import { Component, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
  providers: [File],
})
export class HomePage implements OnInit {
  @ViewChild("slides") slides: IonSlides;

  isLoading = false;
  fileName = "";

  sliderList = [];
  sliderListId = 0;
  sliderAutoPlay = true;
  slideOpts;

  constructor(
    private file: File,
    public ss: SettingService,
    private menu: MenuController
  ) {}

  ionViewWillEnter() {
    this.loadFolder();
  }

  ngOnInit() {
    this.slideOpts = {
      initialSlide: 1,
      speed: this.ss.slider.sliderSpeed,
    };
  }

  loadFolder() {
    if (this.isLoading) {
      return;
    }
    if (this.sliderAutoPlay) {
      this.slides.startAutoplay();
    }
    this.isLoading = true;
    this.sliderList = [];
    this.file
      .listDir(this.file.externalRootDirectory, this.ss.excelFolderName)
      .then((result) => {
        for (let file of result) {
          if (file.isFile == true) {
            var fileExtension = file.name.substr(
              file.name.lastIndexOf(".") + 1
            );
            if (fileExtension == "xls" || fileExtension == "xlsx") {
              this.file
                .readAsBinaryString(
                  `${this.file.externalRootDirectory}/${this.ss.excelFolderName}`,
                  file.name
                )
                .then((data) => {
                  const wb: XLSX.WorkBook = XLSX.read(data, {
                    type: "binary",
                  });
                  wb.SheetNames.forEach((sheet) => {
                    let rowObject = XLSX.utils.sheet_to_json(wb.Sheets[sheet], {
                      raw: true,
                    });
                    let chartParsedData = this.parseChartData(
                      rowObject,
                      file.name
                    );
                    this.sliderList.push(chartParsedData);
                    this.setChartContext(chartParsedData);
                  });
                });
            }
          }
        }
        this.isLoading = false;
      });
  }

  parseChartData(rowObject, fileName = "") {
    if (!this.fileName || this.fileName === "") {
      this.fileName = fileName;
    }
    ++this.sliderListId;

    let xKey,
      yKey,
      xLabels = [],
      yValues = [];

    rowObject.forEach((row) => {
      if (!xKey || !yKey) {
        xKey = Object.keys(row)[0];
        yKey = Object.keys(row)[1];
      }
      xLabels.push(row[xKey]);
      yValues.push(Number(row[yKey]));
    });

    return {
      id: "line-chart-" + this.sliderListId,
      fileName: fileName,
      origin: rowObject,
      xLabels: xLabels,
      yValues: yValues,
      legends: { x: xKey, y: yKey },
    };
  }

  setChartContext(chartData): Chart {
    this.checkElement(chartData.id)
      .then((context) => {
        chartData.element = context;
        this.getLineChart(
          context,
          chartData.xLabels,
          chartData.yValues,
          chartData.legends,
          this.generateChartOptions(chartData)
        );
      })
      .catch((err) => {
        console.log("Home | generateChart | ", err);
        this.sliderList = this.sliderList.filter((item) => item !== chartData);
      });
  }

  generateChartOptions(chartData) {
    return {
      legend: {
        display: true,
        position: "bottom",
      },
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: chartData.legends.y || "",
            },
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };
  }

  getLineChart(
    elem,
    xDataLabels: Array<any>,
    yDataValues: Array<Number>,
    legends: Legend,
    options = {}
  ) {
    let chartContext = elem.getContext("2d");
    return new Chart(chartContext, {
      type: "line",
      options: options,
      data: {
        labels: xDataLabels,
        datasets: [
          {
            label: legends.x || "",
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
            data: yDataValues,
            spanGaps: false,
          },
        ],
      },
    });
  }

  checkElement(contextId): Promise<any> {
    let counterTimeout = 20;
    return new Promise((resolve, reject) => {
      let checkExist = setInterval(function () {
        if (counterTimeout === 0) {
          reject("Error Timeout:  Null Dom Creation Timeout");
        }
        let context: Element = document.getElementById(contextId);
        if (context) {
          resolve(context);
          clearInterval(checkExist);
        }
        --counterTimeout;
      }, 100); // check every 100ms
    });
  }

  doRefresh() {
    if (this.isLoading) {
      return;
    }
    this.fileName = "";
    this.sliderList = [];
    this.sliderAutoPlay = true;
    this.loadFolder();
  }

  openMenu() {
    this.menu.open();
  }

  onDoubleTap() {
    this.slides.lockSwipes(this.sliderAutoPlay);
    this.sliderAutoPlay = !this.sliderAutoPlay;
    if (this.sliderAutoPlay) {
      this.slides.startAutoplay();
    }
    if (!this.sliderAutoPlay) {
      this.slides.stopAutoplay();
    }
  }

  slideInit() {
    this.slides.getActiveIndex().then((idx) => {
      if (this.sliderList[idx]) {
        this.fileName = this.sliderList[idx].fileName;
      }
    });
  }
}

interface Legend {
  x: string;
  y: string;
}
