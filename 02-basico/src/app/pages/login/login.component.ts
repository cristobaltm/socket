import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;

  constructor(
    public wsSrv: WebsocketService
  ) {
    this.username = '';
  }

  ngOnInit(): void {
  }

  login() {
    this.wsSrv.loginWS( this.username );
  }

}
