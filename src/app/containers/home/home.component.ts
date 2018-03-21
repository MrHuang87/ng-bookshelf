import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';
// Project Files
import { GoogleBookApiService } from '../../services/google-books-api.service';
import { BookCollectionService, SBooks } from '../../services/book-collection.service';
import { Book } from '../../services/book/book';
import * as actions from '../../actions/book.actions';
import * as fromBook from '../../reducers/books.reducer';

@Component({
  selector: 'mrk-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  myCollection$: Observable<Book[]> = this.store.select(fromBook.selectAll);
  isSearching: boolean;
  term$ = new Subject<string>();
  searchResult$: Observable<Book[]> = this.gBooksApi
    /** Connect Search Input to gBooksApi  */
    .setupSearch(this.term$)
    /** Temporarily Add MyCollection to output */
    .mergeMap(results => this.myCollection$.map(myCollection => ({ myCollection, results })))
    /** Add is Collected to Results */
    .map(({ results, myCollection }) => SBooks.setIsCollectedOnResults(results, myCollection));

  constructor(
    public gBooksApi: GoogleBookApiService,
    public bookManager: BookCollectionService,
    private store: Store<fromBook.State>
  ) { }

  ngOnInit() { }

  onClearSearch() {
    this.isSearching = false;
  }

  onSearchTerm(term: string) {
    this.isSearching = true;
    this.term$.next(term);
  }

  onSortByTitle() {
    this.bookManager.sortBooksByTitle();
  }

  onAddBook(book: Book) {
    // this.bookManager.addBook(book);
    this.store.dispatch(new actions.Update(book.id, { isCollected: true }));
  }

  onRemoveBook(book: Book) {
    // this.bookManager.removeBook(book);
    this.store.dispatch(new actions.Update(book.id, { isCollected: false }));
  }

}
