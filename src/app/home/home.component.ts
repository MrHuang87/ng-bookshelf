import { Component, OnInit } from '@angular/core';
import { GoogleBookApiService, Book } from '../google-books-api.service';
import { Observable } from 'rxjs/Observable'

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

  constructor(
    public gBooksApi: GoogleBookApiService
  ) { }

  ngOnInit() { }

  onClearSearch() {
    this.isSearching = false
  }

  onSearchTerm(term: string) {
    this.isSearching = true
    this.searchResult$ = this.gBooksApi.searchBook(term)
  }

}
