import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { ContactService } from '../../contacts/contact.service';
import { Contact } from '../../contacts/contact.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-item',
  standalone: false,
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css'
})

export class MessageItemComponent implements OnInit{
  @Input() message: Message;
  messageSender: number;
  constructor(private contactService: ContactService) {}
  
ngOnInit() {
  this.contactService.getContact(this.message.sender).subscribe((contact: Contact) => {
    this.messageSender = contact.id;
  });
}

}
