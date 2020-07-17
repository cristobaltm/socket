import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;

  constructor(
    public wsSrv: WebsocketService,
    private router: Router
  ) {
    this.username = '';
  }

  ngOnInit(): void {
  }

  login() {
    this.wsSrv.loginWS( this.username )
    .then( () => {
      this.router.navigateByUrl( '/msgs' );
    });
  }

}
