import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { mockBookResults } from '../model/mock-books';
import { Book } from '../model/books';


@Injectable()
export class BookCollectionService {
  book$ = new ReplaySubject<Book[]>(1)

  constructor() {
    this.book$.next(mockBookResults.map(b => ({ ...b, isCollected: true })))
  }

  private sortAlphabetical(a: Book, b: Book): number {
    const _a = a.volumeInfo.title.toLowerCase()
    const _b = b.volumeInfo.title.toLowerCase()
    if (_a < _b) return -1;
    if (_a > _b) return 1;
    return 0;
  }

  sortBooksByTitle() {
    this.book$
      .take(1)
      .map(s => s.sort((a, b) => this.sortAlphabetical(a, b)))
      .do(books => this.book$.next(books))
      .subscribe()
  }


  addBook(book: Book) {
    book.isCollected = true
    this.book$
      .take(1)
      .map(books => [...books, book])
      .do(books => this.book$.next(books))
      .subscribe()
  }

  removeBook(bookToRemove: Book) {
    bookToRemove.isCollected = false
    this.book$
      .take(1)
      .map(books => books.filter(b => b !== bookToRemove))
      .do(books => this.book$.next(books))
      .subscribe()
  }

}
