import { Component, EventEmitter, Output } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent {
  contacts: Contact[] = []
  
  constructor(private contactService: ContactService) {};

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
  }

  onContactSelected(contact: Contact) {
    this.contactService.contactSelectedEvent.emit(contact)
  }

}
