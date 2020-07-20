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
      from: this.wsSrv.getUser().name,
      body: message
    };

    this.wsSrv.emit( 'message', payload );
  }

  getMessages() {
    return this.wsSrv.listen( 'new-message' );
  }

  getPrivateMessages() {
    return this.wsSrv.listen( 'private-message' );
  }

  getUsersOnline() {
    return this.wsSrv.listen( 'users-online' );
  }

  emitUsersOnline() {
    this.wsSrv.emit( 'get-users-online' );
  }
}
