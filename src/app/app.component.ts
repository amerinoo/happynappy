import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexChart,
  ApexLegend,
  ApexNonAxisChartSeries,
  ChartComponent,
} from 'ng-apexcharts';
import { NappyService } from './shared/service/nappy.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: any;
  colors: any;
  legend: ApexLegend;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  mamiCount = 0;
  papiCount = 0;
  xxxxCount = 0;

  constructor(private nappyService: NappyService) {}

  ngOnInit(): void {
    this.chartOptions = {
      series: [this.mamiCount, this.papiCount, this.xxxxCount],
      chart: {
        type: 'pie',
        width: 400,
      },
      labels: ['mami', 'papi', 'xxxx'],
      legend: {
        labels: { colors: 'white' },
        position: 'bottom',
        onItemClick: { toggleDataSeries: false },
      },
    };

    this.nappyService.getAllNappy().subscribe((res) => {
      this.mamiCount = res.filter((v) => v.who == 'mami').length;
      this.papiCount = res.filter((v) => v.who == 'papi').length;
      this.xxxxCount = res.filter((v) => v.who == 'xxxx').length;
      this.chartOptions.series = [
        this.mamiCount,
        this.papiCount,
        this.xxxxCount,
      ];
    });
  }

  onClick(who: string) {
    var nappy = { who: who, date: new Date() };
    this.nappyService.addNappy(nappy);
  }
}
