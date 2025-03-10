import { Component, OnDestroy, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit, OnDestroy{
    documents: Document[] = [];
    document: Document;
    id: number;
  
    private docChangeSub: Subscription
    constructor(private documentService: DocumentService,
                private router: Router,  
                private route: ActivatedRoute
    ) {};
    
  
    ngOnInit() {
      this.documents = this.documentService.getDocuments();
    
      this.docChangeSub = this.documentService.documentChangedEvent
        .subscribe(
          (documents: Document[]) => {
            this.documents = documents;
          }
        );
    }
    
  
    onNewDocument() {
      this.router.navigate(['new'], {relativeTo: this.route})
    }

    
    ngOnDestroy(): void {
      if (this.docChangeSub) {
        this.docChangeSub.unsubscribe();
      }
    }
    

}
