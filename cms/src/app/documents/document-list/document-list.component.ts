import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  standalone: false,
  
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  @Output() documentWasSelected = new EventEmitter<Document>();
    documents: Document[] = [
      new Document(1, 'CIT 260', 'Class one in this certificate', 'byi.edu/cit260'),
      new Document(2, 'CIT 366', 'Class two in this certificate', 'byi.edu/cit366'),
      new Document(2, 'CIT 425', 'Class three in this certificate', 'byi.edu/cit425'),
      new Document(2, 'CIT 430', 'Class four in this certificate', 'byi.edu/cit430')
    ]
  
    constructor() {};
  
    ngOnInit() {}
  
    onDocumentSelected(document: Document) {
      this.documentWasSelected.emit(document)
    }

}
