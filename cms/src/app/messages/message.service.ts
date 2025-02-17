import { Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageSelectedEvent = new EventEmitter<Message>();
  messageChangedEvent = new EventEmitter<Message[]>()
  messages: Message[] = [];
  constructor() { 
    this.messages = MOCKMESSAGES
  }
  getMessages() {
    return this.messages.slice()
  }

  getMessage(id: string): Message | undefined {
      return this.messages.find(message => message.id === id)
     }
     
  addMessage(message: Message) {
    console.log("heres from service")
    console.log(message)
    const plainMessage = {...message}
    console.log(plainMessage)
    this.messages.push(plainMessage)
    this.messageChangedEvent.emit(this.messages.slice())
  }
}
