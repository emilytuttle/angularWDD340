import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Router, Params } from '@angular/router';


@Component({
  selector: 'app-contact-edit',
  standalone: false,
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css'
})
export class ContactEditComponent implements OnInit{
  originalContact: Contact;
   contact: Contact;
   groupContacts: Contact[] = [];
   editMode: boolean = false;
   id: number;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute) {
}

ngOnInit() {
  this.route.params.subscribe((params: Params) => {
    this.id = +params['id'];

    if (this.id == null || this.id === 0) {
      this.editMode = false;
      return;
    }
    this.contactService.getContact(this.id).subscribe(contact => {
      this.originalContact = contact;
      if (this.originalContact == null) {
        return;
      }
      this.editMode = true;
      this.contact = { ...this.originalContact };
    });
  });
}

onCancel() {
  this.router.navigate(['/contacts']);
}

onAddContact(form: NgForm) {
const value = form.value;
const newContact = new Contact(0, value.name, value.email, value.phone, value.imageUrl, value.group);


    newContact.name = value.name;
    newContact.email = value.email;
    newContact.phone = value.phone;
    newContact.imageUrl = value.imageUrl;
    newContact.imageUrl = value.description;
    newContact.group = value.group;


    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact).subscribe(() => {
        this.router.navigate(['/contacts']);
      });
    } else {
      this.contactService.addContact(newContact).subscribe(() => {
        this.router.navigate(['/documents']);
      });
    }
  }
}


