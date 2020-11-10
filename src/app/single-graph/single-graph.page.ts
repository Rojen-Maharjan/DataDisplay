import * as XLSX from "xlsx";
import { interval } from 'rxjs';
import { Chart } from "chart.js";
import { File } from "@ionic-native/file/ngx";
import { SettingService } from "../services/setting.service";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: 'app-single-graph',
  templateUrl: './single-graph.page.html',
  styleUrls: ['./single-graph.page.scss'],
})
export class SingleGraphPage implements OnInit {
  @ViewChild("context") context: ElementRef;
  @ViewChild('doubleTapArea') doubleTapArea: ElementRef;

  fileName = "";
  sliderListId = 0;
  isLoading = false;
  chartDataList = [];
  sliderAutoPlay = true;
  currentChartIndex: number;
  sliderIntervalSubscription;

  constructor(
    private file: File,
    public ss: SettingService,
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.loadFolder();
  }

  loadFolder() {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    this.chartDataList = [];
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
                    this.chartDataList.push(chartParsedData);
                    if (this.chartDataList.length === 1) {
                      this.currentChartIndex = 0;
                      this.setChartContextByIndex(0);
                      this.slideChartData();
                    }
                  });
                });
            }
          }
        }
        this.isLoading = false;
      });
  }

  slideChartData() {
    this.sliderIntervalSubscription = interval(this.ss.sliderSpeedInms).subscribe(() => {
      ++this.currentChartIndex;
      if (this.chartDataList.length <= this.currentChartIndex) {
        this.currentChartIndex = 0;
      }
      this.setChartContextByIndex(this.currentChartIndex);
    });
  }


  parseChartData(rowObject, fileName = "") {
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

  setChartContextByIndex(index): Chart {
    if (typeof this.chartDataList[index] !== 'undefined') {
      let chartData = this.chartDataList[index];
      this.fileName = chartData.fileName;
      this.getLineChart(
        this.context,
        chartData.xLabels,
        chartData.yValues,
        chartData.legends,
        this.generateChartOptions(chartData)
      );
    }
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
    chartContext,
    xDataLabels: Array<any>,
    yDataValues: Array<Number>,
    legends: Legend,
    options = {}
  ) {
    return new Chart(chartContext.nativeElement, {
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

  doRefresh() {
    if (this.isLoading) {
      return;
    }
    this.fileName = "";
    this.chartDataList = [];
    this.sliderAutoPlay = true;
    this.loadFolder();
  }

  sliderToggle() {
    if (this.sliderAutoPlay) {
      this.sliderIntervalSubscription.unsubscribe();
    } else {
      this.slideChartData();
    }
    this.sliderAutoPlay = !this.sliderAutoPlay;
  }

  switchSlider(index) {
    this.setChartContextByIndex(index);
    this.currentChartIndex = index;
  }
}

interface Legend {
  x: string;
  y: string;
}
