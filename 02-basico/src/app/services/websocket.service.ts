import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { User } from '../classes/user.model';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus: boolean;
  public user: User;

  constructor(
    private socket: Socket
  ) {
    this.socketStatus = false;
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
    console.log( 'Configurar', name );

    this.emit( 'config-user', { name }, resp => {
      console.log(resp);
    });
  }
}
