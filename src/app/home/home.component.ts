import { Component, OnInit } from '@angular/core';
import { GoogleBookApiService, Book } from '../google-books-api.service';
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject';

export let books = [
  new Book('Title A', ['Author A', 'Author B'], 'id-3', '2001'),
  new Book('Title B', ['Author B'], 'id-4', '2008'),
]

@Component({
  selector: 'mrk-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  books: Book[] = books
  isSearching: boolean
  searchResult$: Observable<Book[]>
  term$ = new Subject<string>()

  constructor(
    public gBooksApi: GoogleBookApiService
  ) { }

  ngOnInit() {
    this.setupSearchInput()
  }

  onClearSearch() {
    this.isSearching = false
  }

  setupSearchInput() {
    this.searchResult$ = this.term$
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap(term => this.gBooksApi.searchBook(term))
      .share()
  }

  onSearchTerm(term: string) {
    this.isSearching = true
    this.term$.next(term)
  }

}
