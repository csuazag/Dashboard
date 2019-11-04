import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { ChartsService } from '../services/charts.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {

  day: string;
  dayOptions: string[];
  nextDay: string;

  hide: boolean;

  boxes: any = {
    average_speed: 0,
    average_time: 0,
    total_accidents: 0,
    total_dead: 0,
    total_injured: 0,
    total_subZones: 0,
    total_vehicles: 0,
    total_zones: 0,
  };


  labelsChartDayxHour: any[] = [];
  seriesChartDayxHour: any[] = [[]];

  constructor(private chartService: ChartsService) {

    this.day = 'Lunes';
    this.dayOptions = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];


    
    this.chartService.getMetaData().subscribe(data => {
      this.boxes = data;
      console.log(data);
    });


    const dataDayHour: any = {
      labels: this.labelsChartDayxHour,
      series: this.seriesChartDayxHour
    };

    const optionDayHour: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 50,
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    }

    const dayHour = new Chartist.Line('#chartDayHourChart', dataDayHour, optionDayHour);
    this.startAnimationForLineChart(dayHour);


  this.hide
    this.chartService.getChartDayxHour(1).subscribe(data => {
      this.labelsChartDayxHour = data['labels'];
      this.seriesChartDayxHour = data['series'];

    });

  }


  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  };

  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  };


  ngOnInit() {
    /* ----------==========     Promedio vs Hora (Día)    ==========---------- */








    /* ----------==========     Example Bar Chart    ==========---------- */

    /*

    const datawebsiteViewsChart = {
      labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
      series: [
        [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

      ]
    };
    const optionswebsiteViewsChart = {
      axisX: {
        showGrid: false
      },
      low: 0,
      high: 1000,
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
    };
    const responsiveOptions: any[] = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];

    const websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

    //start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(websiteViewsChart);



    */

    // Chart Average vs Hour according a day of the week

    const dataForChartMine: any = {
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
      series: [[5, 2, 8, 3, 5, 0, 2, 44, 5, 2, 8, 3, 5, 0, 2, 44, 5, 2, 8, 3, 5, 0, 2, 44,]]
    };

    const optionsDataForChartMine: any = {
      low: 0,
      showArea: true,
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    }

    const chartMine = new Chartist.Line('#averageVSdays', dataForChartMine, optionsDataForChartMine);


    this.startAnimationForLineChart(chartMine);
  }



  actualizarChartDayHour() {

    if (this.nextDay != this.day) {
      this.day = this.nextDay;

      let param: Number;
      if (this.day == 'Lunes') {
        param = 1;
      } else if (this.day == 'Martes') {
        param = 2;
      } else if (this.day == 'Miercoles') {
        param = 3;
      } else if (this.day == 'Jueves') {
        param = 4;
      } else if (this.day == 'Viernes') {
        param = 5;
      } else if (this.day == 'Sabado') {
        param = 6;
      } else if (this.day == 'Domingo') {
        param = 7
      } else {
        param = -1;
      }

      this.chartService.getChartDayxHour(param).subscribe(data => {
        this.labelsChartDayxHour = data['label'];
        this.seriesChartDayxHour = data['series'];
        console.log("melo");
      });


    } else {

    }






    const dataDayHour: any = {
      labels: this.labelsChartDayxHour,
      series: this.seriesChartDayxHour
    };

    const optionDayHour: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 50,
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    }

    const dayHour = new Chartist.Line('#chartDayHourChart', dataDayHour, optionDayHour);
    this.startAnimationForLineChart(dayHour);

  }

}

