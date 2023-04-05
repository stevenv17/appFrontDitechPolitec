import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthorsService } from './services/authors.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  authorFormInitial: any = {
    id: null,
    name: "",
    books: []
  };

  books: any = [];
  listAuthors: any = [];

  modalTitle: string = "";
  modalVisible: boolean = false;
  isOkLoading: boolean = false;
  loadingTable: boolean = false;

    // validations
  modalForm = new FormGroup({
    id : new FormControl(this.authorFormInitial.id),
    name: new FormControl(this.authorFormInitial.name, [Validators.required]),
    books: new FormControl(this.authorFormInitial.books)
  });

  get authorName() { return this.modalForm.get('name'); }

  constructor(private authorsService: AuthorsService,
    private message: NzMessageService) { }

  ngOnInit(): void {
    this.loadAllAuthors();
  }

  cleanAuthorForm () {
    this.isOkLoading = false;
    this.modalForm.reset(this.authorFormInitial);
  }

  showModal(author: any = null) {
    this.cleanAuthorForm();
    if (author != null) {
      this.modalForm.setValue(author);
    }
    this.modalVisible = true;
  }

  saveAuthor() {
    this.isOkLoading = true;
    const formData = this.modalForm.value;
    this.authorsService.saveAuthor(formData).subscribe(
      (data) => {
        this.isOkLoading = false;
        this.modalVisible = false;
        this.message.create('success', 'Author Saved');
        this.loadAllAuthors();
        },
        err => {
          this.message.create('error', err.message);
        }
    );
  }

  deleteAuthor(author: any) {
    const formData = {id: author.id};
    this.authorsService.deleteAuthor(formData).subscribe(
      (data) => {
        this.message.create('success', 'Author Deleted');
        this.loadAllAuthors();
        },
        err => {
          this.message.create('error', err.message);
        }
    );
  }

  loadAllAuthors() {
    this.loadingTable = true;
    this.authorsService.getAuthors({}).subscribe(
      (data) => {
        
          let authors: any = data;
          this.listAuthors = authors.map((item): any => {
            return {
                id: item.id,
                name: item.name,
                books: []
            }
          });
          this.loadingTable = false;
        
        },
        err => {
          this.message.create('error', err.message);
        }
    );
  }

  loadAuthor(author) {
    this.books = [];
    this.authorsService.getAuthors({id:author.id}).subscribe(
      (data) => {
        
          let authors: any = data;
          this.books = authors[0].books;       
        
        },
        err => {
          this.message.create('error', err.message);
        }
    );
  }

}
