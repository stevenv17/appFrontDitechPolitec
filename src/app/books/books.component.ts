import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BooksService } from './services/books.service';
import { AuthorsService } from '../authors/services/authors.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  isOkLoading: boolean = false;
  modalVisible: boolean = false;


  listAuthors: any = [];
  
  authors: any = [];
  listBooks: any = [];
  loadingTable: boolean = false;

  modalTitle: string = "";

  bookFormInitial: any = {
    id: null,
    name: "",
    authors: []
  };
  
  // validations
  modalForm = new FormGroup({
    id : new FormControl(this.bookFormInitial.id),
    name: new FormControl(this.bookFormInitial.name, [Validators.required]),
    authors: new FormControl(this.bookFormInitial.authors)
  });

  get bookName() { return this.modalForm.get('name'); }

  constructor(private booksService: BooksService, private message: NzMessageService, private authorsService: AuthorsService) { }

  ngOnInit(): void {
    this.loadAllBooks();
    this.loadAllAuthors();
  }

  cleanBookForm () {
    this.isOkLoading = false;
    this.modalForm.reset(this.bookFormInitial);
  }

  showModal(book: any = null) {
    this.modalVisible = true;
    this.cleanBookForm();
    
    if (book != null) {
      this.booksService.getBooks({id:book.id}).subscribe(
        (data) => {
          
            let books: any = data;
            this.modalForm.setValue(books[0]);
            let element;
            let authors = [];

            const that = this;
            if (books[0].authors){
              books[0].authors.forEach(function(a) {
                element = that.listAuthors.find(x => x.id == a.id);
                if (element) {
                  authors.push(element);
                }
              });
            }

            
            this.modalForm.controls['authors'].setValue(authors);   
          
          },
          err => {
            this.message.create('error', err.message);
          }
      );
    }
    
  }

  loadBook(book) {
    this.authors = [];
    this.booksService.getBooks({id:book.id}).subscribe(
      (data) => {
        
          let books: any = data;
          this.authors = books[0].authors;       
        
        },
        err => {
          this.message.create('error', err.message);
        }
    );
  }

  deleteBook(book: any) {
    const formData = {id: book.id};
    this.booksService.deleteBook(formData).subscribe(
      (data) => {
        this.message.create('success', 'Book Deleted');
        this.loadAllBooks();
        },
        err => {
          this.message.create('error', err.message);
        }
    );
  }

  loadAllBooks() {
    this.loadingTable = true;
    this.booksService.getBooks({}).subscribe(
      (data) => {
        
          let books: any = data;
          this.listBooks = books.map((item): any => {
            return {
                id: item.id,
                name: item.name,
                authors: []
            }
          });
          this.loadingTable = false;
        
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
                name: item.name
            }
          });
          this.loadingTable = false;
        
        },
        err => {
          this.message.create('error', err.message);
        }
    );
  }

  saveBook() {
    this.isOkLoading = true;
    const formData = this.modalForm.value;
    this.booksService.saveBook(formData).subscribe(
      (data) => {
        this.isOkLoading = false;
        this.modalVisible = false;
        this.message.create('success', 'Book Saved');
        this.loadAllBooks();
        },
        err => {
          this.message.create('error', err.message);
        }
    );
  }

}
