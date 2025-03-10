import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model'
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { DocumentService } from '../document.service';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'app-document-detail',
  standalone: false,
  
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css'
})
export class DocumentDetailComponent implements OnInit{
  document: Document;
  id: number;
  nativeWindow: any;

  constructor(private documentService: DocumentService,
              private windowRefService: WindRefService,
              private router: Router,
              private route: ActivatedRoute
              
  ) {
    this.nativeWindow = windowRefService.getNativeWindow()
  }


  ngOnInit() {
    this.route.params
    .subscribe(
     (params: Params) => {
      this.id = params['id']
      this.documentService.getDocument(this.id).subscribe((document: Document) => {
        this.document = document; // Assign the result after subscribing
      });
      
     }
    )
  }

  onEditDocument() {
    this.router.navigate(['edit'], {relativeTo: this.route})
  }

  onView() {
    if (this.document.docUrl) {
      this.nativeWindow.open(this.document.docUrl)
    }
  }

  onDelete() {
   this.documentService.deleteDocument(this.document);
   this.router.navigate(['documents'])
}
}


