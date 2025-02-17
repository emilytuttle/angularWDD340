import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-edit',
  standalone: false,
  
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent implements OnInit{
  @ViewChild('subjectInput') subjectInputRef: ElementRef
  @ViewChild('messageInput') messageInputRef: ElementRef

  constructor(private mService: MessageService) {  }

  ngOnInit() {
  }


  onSendMessage(event) {
    event.preventDefault()
    const mSubject = this.subjectInputRef.nativeElement.value
    const mMessage = this.messageInputRef.nativeElement.value
    const newMessage = new Message('11', mSubject, mMessage, '1')
    this.mService.addMessage(newMessage)
  }

}
