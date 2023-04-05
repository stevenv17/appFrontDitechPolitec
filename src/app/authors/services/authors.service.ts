import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  private url_base = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  private requestOptions(params): any {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let paramsIn = new HttpParams().set('value', JSON.stringify(params));
    return {params: paramsIn, headers: headers };
  }


  getAuthors(params: Object = null) {
    let options = this.requestOptions(params);
    return this.http.get(this.url_base + '/getAuthors', options);
  }

  
  saveAuthor(body: Object) {
    let options = this.requestOptions(null);
    return this.http.post(this.url_base + '/saveAuthor', body, options);
  }

  deleteAuthor(body: Object) {
    let options = this.requestOptions(null);
    return this.http.post(this.url_base + '/deleteAuthor', body, options);
  }



}
