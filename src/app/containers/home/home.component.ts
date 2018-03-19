import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject';
import { GoogleBookApiService } from '../../services/google-books-api.service';
import { BookCollectionService } from '../../services/book-collection.service';
import { Book } from '../../model/books';


@Component({
  selector: 'mrk-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  books: Observable<Book[]> = this.bookManager.book$
  isSearching: boolean
  term$ = new Subject<string>()
  searchResult$: Observable<Book[]> = this.gBooksApi.setupSearch(this.term$)

  constructor(
    public gBooksApi: GoogleBookApiService,
    public bookManager: BookCollectionService
  ) { }

  ngOnInit() { }

  onClearSearch() {
    this.isSearching = false
  }

  onSearchTerm(term: string) {
    this.isSearching = true
    this.term$.next(term)
  }

  onSortByTitle() {
    this.bookManager.sortBooksByTitle()
  }

  onAddBook(book: Book) {
    this.bookManager.addBook(book)
  }

  onRemoveBook(book: Book) {
    this.bookManager.removeBook(book)
  }

}
