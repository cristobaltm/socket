import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels: string[] = [ 'Pregunta 1', 'Pregunta 2', 'Pregunta 4', 'Pregunta 4' ];
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [];

  public barChartData: any[] = [];

  constructor(
    private http: HttpClient,
    public wsSrv: WebsocketService
  ) { }

  ngOnInit(): void {
    this.getGraphData();
    this.listenSocket();
  }

  getGraphData(): void {
    this.http.get( 'http://localhost:5000/graph' ).subscribe( (data: any) => {
      this.barChartData = data;
    });
  }

  listenSocket(): void {
    this.wsSrv.listen( 'change-graph' ).subscribe( (data: any) => {
      this.barChartData = data;
    });
  }

}
