import { Component } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent {
  contacts: Contact[] = []
  contact: Contact;
  id: number
  
  constructor(private contactService: ContactService,
              private router: Router,  
               private route: ActivatedRoute
  ) {};

  ngOnInit() {
    this.contacts = this.contactService.getContacts();

    this.contactService.contactChangedEvent
        .subscribe(
         (contacts) => {
          this.contacts = contacts
         }
        )
  }

  onNewContact() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }

}
