import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  public lineChartData: Array<any> = [
    {
        data: [0, 0, 0, 0],
        label: 'Ventas'
    }
  ];
  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April'];

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
      this.lineChartData = data;
    });
  }

  listenSocket(): void {
    this.wsSrv.listen( 'change-graph' ).subscribe( (data: any) => {
      console.log('Socket', data);
      this.lineChartData = data;
    });
  }

}
