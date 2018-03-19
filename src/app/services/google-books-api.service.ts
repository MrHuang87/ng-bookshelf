import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Book } from './book/book';
import { mockBookResults } from './book/mock-books';

@Injectable()
export class GoogleBookApiService {

  constructor(private http: HttpClient) { }

  setupSearch(term$: Observable<string>): Observable<Book[]> {
    return term$
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap(term => this.searchBooks(term))
      .share()
  }

  mockSearchBooks(term: string): Observable<Book[]> {
    let output = mockBookResults.map((book, ind) => ({ ...book, isCollected: false }))
    return Observable
      .of(output)
      .do(books => console.log({ books }))
      .delay(1000)
  }

  searchBooks(searchTerm: string): Observable<Book[]> {
    const BOOK_URL = 'https://www.googleapis.com/books/v1/volumes';
    return this.http
      .get<{ items: Book[] }>(BOOK_URL + `?q=${searchTerm}`)
      .map(books => books.items || [])
  }

}
