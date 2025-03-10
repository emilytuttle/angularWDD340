import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact []>()
  contacts: Contact [] =[];
  maxContactId: number;
  contactsListClone: Contact[]
  constructor() {
     this.contacts = MOCKCONTACTS;
  }

  getContacts() {
    return this.contacts.slice()
  }

  getContact(index: number): Observable<Contact>{
    const contact = this.contacts[index]
    return of(contact)
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
    
      addContact(newContact: Contact): Observable<void> {
        return new Observable<void>((observer) => {
              if (newContact == undefined || newContact == null) {
                observer.error('Invalid Contact');
                return;
              }
              this.maxContactId++;
              newContact.id = this.maxContactId;
              this.contacts.push(newContact);
              this.contactsListClone = this.contacts.slice();
              this.contactChangedEvent.next(this.contactsListClone);
              observer.next(); // Signals completion
              observer.complete();
            });
      }
    
      updateContact(originalContact: Contact, newContact: Contact): Observable<void> {
          return new Observable<void>((observer) => {
            if (originalContact == undefined || originalContact == null || newContact == undefined || newContact == null) {
              observer.error('Invalid contact');
              return;
            }
        
            const pos = this.contacts.indexOf(originalContact);
            if (pos < 0) {
              observer.error('Contact not found');
              return;
            }
        
            newContact.id = originalContact.id;
            this.contacts[pos] = newContact;
            this.contactsListClone = this.contacts.slice();
            this.contactChangedEvent.next(this.contactsListClone);
            observer.next(); // Signals completion
            observer.complete();
          });
        }
  
}