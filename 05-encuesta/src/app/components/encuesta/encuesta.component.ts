import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
// import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels: string[] = [ 'Pregunta 1', 'Pregunta 2', 'Pregunta 4', 'Pregunta 4' ];
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [];

  public barChartData: any[] = [{
    data: [ 65, 59, 80, 81 ],
    label: 'Entrevistados'
  }];
  constructor() { }

  ngOnInit(): void {
  }
}
