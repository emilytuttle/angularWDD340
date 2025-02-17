import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contacts: Contact [] =[];
  constructor() {
     this.contacts = MOCKCONTACTS;
  }

  getContacts() {
    return this.contacts.slice()
  }

  getContact(id: string): Contact | undefined {
    return this.contacts.find(contact => contact.id === id);
  }
  
}