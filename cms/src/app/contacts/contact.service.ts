import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact []>()
  contacts: Contact [] =[];
  maxContactId: number;
  constructor() {
     this.contacts = MOCKCONTACTS;
  }

  getContacts() {
    return this.contacts.slice()
  }

  getContact(index: string){
    return this.contacts[index]
  }

  deleteContact(contact: Contact) {
      if (!contact) {
         return;
      }
      const pos = this.contacts.indexOf(contact);
      if (pos < 0) {
         return;
      }
      this.contacts.splice(pos, 1);
      this.contactChangedEvent.emit(this.contacts.slice());
    }

    getMaxId(): number {
        let maxId = 0;
    
        for (let contact of this.contacts) {
            let currentId = Number(contact.id);
            if (currentId > maxId) {
                maxId = currentId;
            }
        }
    
        return maxId;
      }
    
      addContact(newContact: Contact) {
        if (newContact == undefined || newContact == null) {
          return
        }
        this.maxContactId++
        newContact.id = this.maxContactId
        this.contacts.push(newContact)
        let contactsListClone = this.contacts.slice()
        this.contactChangedEvent.next(contactsListClone)
      }
    
      updateContact(originalContact: Contact, newContact: Contact) {
        if (originalContact == undefined || originalContact == null || newContact == undefined || newContact == null) {
          return
        } 
            
        const pos = this.contacts.indexOf(originalContact)
        if (pos < 0) {
          return
        } 
    
        newContact.id = originalContact.id
        this.contacts[pos] = newContact
        let contactsListClone = this.contacts = this.contacts.slice()
        this.contactChangedEvent.next(contactsListClone)
    } 
  
}