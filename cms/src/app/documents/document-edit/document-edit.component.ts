import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DocumentService } from '../document.service';
import { NgForm } from '@angular/forms';  // Import NgForm for template-driven form
import { Document } from '../document.model';


@Component({
  selector: 'app-document-edit',
  standalone: false,
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  id: number;
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];

      if (this.id == null || this.id === 0) {
        this.editMode = false;
        return;
      }
      this.documentService.getDocument(this.id).subscribe(document => {
        this.originalDocument = document;
        if (this.originalDocument == null) {
          return;
        }
        this.editMode = true;
        this.document = { ...this.originalDocument };  // Clone the original document
      });
    });
  }

  onCancel() {
    this.router.navigate(['/documents']);
  }

  onAddDocument(form: NgForm) {
    const value = form.value;
    const newDocument = new Document(0, value.name, value.description, value.docUrl);

    newDocument.name = value.name;
    newDocument.description = value.description;
    newDocument.docUrl = value.url;

    if (this.editMode) {
      this.documentService.updateDocument(this.originalDocument, newDocument).subscribe(() => {
        this.router.navigate(['/documents']);
      });
    } else {
      this.documentService.addDocument(newDocument).subscribe(() => {
        this.router.navigate(['/documents']);
      });
    }
  }
}
