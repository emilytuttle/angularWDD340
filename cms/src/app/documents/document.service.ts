import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentSelectedEvent = new Subject<Document>();
  documentChangedEvent = new Subject<Document []>()
  documents: Document [] = [];
  maxDocumentId: number;
  documentsListClone: Document[];
  constructor() {
     this.documents= MOCKDOCUMENTS
     this.maxDocumentId = this.getMaxId();
     
  }
  

  getDocuments(): Document[] {
    return [...this.documents];  
  }

  getDocument(index: number): Observable<Document>{
    const document = this.documents[index];
    return of(document); 
  }
  

  deleteDocument(document: Document) {
    if (!document) {
       return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
       return;
    }
    this.documents.splice(pos, 1);
    this.documentChangedEvent.next(this.documents.slice());
  }

  getMaxId(): number {
    let maxId = 0;

    for (let document of this.documents) {
        let currentId = Number(document.id);
        if (currentId > maxId) {
            maxId = currentId;
        }
    }

    return maxId;
  }

  addDocument(newDocument: Document): Observable<void> {
    return new Observable<void>((observer) => {
      if (newDocument == undefined || newDocument == null) {
        observer.error('Invalid document');
        return;
      }
      this.maxDocumentId++;
      newDocument.id = this.maxDocumentId;
      this.documents.push(newDocument);
      this.documentsListClone = this.documents.slice();
      this.documentChangedEvent.next(this.documentsListClone);
      observer.next(); // Signals completion
      observer.complete();
    });
  }
  
  updateDocument(originalDocument: Document, newDocument: Document): Observable<void> {
    return new Observable<void>((observer) => {
      if (originalDocument == undefined || originalDocument == null || newDocument == undefined || newDocument == null) {
        observer.error('Invalid document');
        return;
      }
  
      const pos = this.documents.indexOf(originalDocument);
      if (pos < 0) {
        observer.error('Document not found');
        return;
      }
  
      newDocument.id = originalDocument.id;
      this.documents[pos] = newDocument;
      this.documentsListClone = this.documents.slice();
      this.documentChangedEvent.next(this.documentsListClone);
      observer.next(); // Signals completion
      observer.complete();
    });
  }
  


  
}
