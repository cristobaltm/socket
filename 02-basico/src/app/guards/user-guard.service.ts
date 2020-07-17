import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { WebsocketService } from '../services/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(
    public wsSrv: WebsocketService,
    private router: Router
  ) { }

  canActivate() {
    if ( this.wsSrv.getUser() ) {
      return true;
    }

    this.router.navigateByUrl( '/' );
    return false;
  }
}
