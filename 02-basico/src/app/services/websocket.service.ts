import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { User } from '../classes/user.model';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus: boolean;
  public user: User = null;

  constructor(
    private socket: Socket
  ) {
    this.socketStatus = false;
    this.loadStorage();
    this.checkStatus();
  }

  checkStatus() {
    this.socket.on( 'connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
    });

    this.socket.on( 'disconnect', () => {
      console.log('Desconectado al servidor');
      this.socketStatus = false;
    });
  }

  emit( event: string, payload?: any, callback?: Function ) {
    console.log('Emitiendo', event);

    this.socket.emit( event, payload, callback );
  }

  listen( event: string ) {
    return this.socket.fromEvent( event );
  }

  loginWS( name?: string ) {
    return new Promise( ( resolve, reject ) => {

      this.emit( 'config-user', { name }, resp => {
        this.user = new User( name );
        this.saveStorage();
        resolve();
      });

    });
  }

  getUser() {
    return this.user;
  }

  saveStorage() {
    localStorage.setItem( 'user', JSON.stringify( this.user ));
  }

  loadStorage() {
    if ( localStorage.getItem( 'user' ) ) {
      this.user = JSON.parse( localStorage.getItem( 'user' ) );
      this.loginWS( this.user.name );
    }
  }
}
