import { Component, OnInit } from '@angular/core';
import { Message } from './message.model';
import { MessageService } from './message.service';

@Component({
  selector: 'app-messages',
  standalone: false,
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
  providers: [MessageService]
})
export class MessagesComponent {
  // selectedMessage: Message

  // constructor(private messageService: MessageService) {}

  // ngOnInit() {
  //     this.messageService.messageSelectedEvent
  //     .subscribe(
  //       (message: Message) => {
  //         this.selectedMessage = message
  //       }
  //     )
      
  //   }
}
