import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Contact } from '../../contact.model';

@Component({
  selector: 'app-contact-item',
  standalone: false,
  
  templateUrl: './contact-item.component.html',
  styleUrl: './contact-item.component.css'
})
export class ContactItemComponent {
  @Input() contact: Contact;
  @Input() index: number;
  

  constructor() {}

  ngOnInit() {

  }

  
}
