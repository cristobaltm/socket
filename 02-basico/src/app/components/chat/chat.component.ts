import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  text = '';
  chatMsgs: any[] = [];
  element: HTMLElement;
  msgSubscription: Subscription;

  constructor(
    public charSrv: ChatService
  ) { }

  ngOnInit(): void {

    this.element = document.getElementById( 'chat-msgs' );

    this.msgSubscription = this.charSrv.getMessages().subscribe( msg => {
      this.chatMsgs.push( msg );

      setTimeout( () => {
        this.element.scrollTop = this.element.scrollHeight;
      }, 50 );
    });
  }

  ngOnDestroy() {
    this.msgSubscription.unsubscribe();
  }

  sendForm() {

    // Validación para no enviar mensajes vacíos
    if ( this.text.trim().length === 0 ) {
      return;
    }

    this.charSrv.sendMessage( this.text );
    this.text = '';
  }

}
