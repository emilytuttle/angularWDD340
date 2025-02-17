import { Component } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-list',
  standalone: false,
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {
  messages: Message[] = [];

  constructor(private messageService: MessageService) {};

  ngOnInit () {
    this.messages = this.messageService.getMessages();
    this.messageService.messageChangedEvent
    .subscribe(
      (messages: Message[]) => {
        console.log('Updated messages:', messages);
        this.messages = messages
      }
    )
  }
 

  // onMessageSelected(message: Message) {
  //   this.messageService.messageSelectedEvent.emit(message)
  // }


}
