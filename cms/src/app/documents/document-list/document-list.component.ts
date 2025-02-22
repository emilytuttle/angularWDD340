import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
    documents: Document[] = [];
    document: Document;
    id: number;
  
    constructor(private documentService: DocumentService,
                private router: Router,  
                private route: ActivatedRoute
    ) {};
    
  
    ngOnInit() {
      this.documents = this.documentService.getDocuments();
      
      this.documentService.documentChangedEvent
      .subscribe(
        (documents) => {
        this.documents = documents
        }
      )
    }
  
    onNewDocument() {
      this.router.navigate(['new'], {relativeTo: this.route})
    }

}
