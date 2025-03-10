import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-contact-detail',
  standalone: false,
  
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css'
})
export class ContactDetailComponent implements OnInit{
  contact: Contact;
  id: number

  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params
        .subscribe(
         (params: Params) => {
          this.id = params['id']
          this.contactService.getContact(this.id).subscribe((contact: Contact) => {
            this.contact = contact;
          })
         }
        )
        
  }



  onEditContact() {
    this.router.navigate(['edit'], {relativeTo: this.route})
  }
  onDelete() {
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['contacts'])
 }
}