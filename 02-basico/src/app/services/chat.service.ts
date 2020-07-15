import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public wsSrv: WebsocketService
  ) { }

  sendMessage( message: string ) {
    const payload = {
      from: 'Cristobal',
      body: message
    };

    this.wsSrv.emit( 'message', payload );
  }

  getMessages() {
    return this.wsSrv.listen( 'new-message' );
  }
}
