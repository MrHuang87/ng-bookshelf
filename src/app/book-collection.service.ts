import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { ReplaySubject } from 'rxjs/ReplaySubject';

export class Book {
  constructor(
    public title: string,
    public authors: string[],
    public id: string,
    public publishedDate: string,
    public isCollected = false
  ) { }
}

export let books = [
  new Book('Title A', ['Author A', 'Author B'], 'id-3', '2001', true),
  new Book('Title B', ['Author B'], 'id-4', '2008', true),
]

@Injectable()
export class BookCollectionService {
  book$ = new ReplaySubject<Book[]>(1)

  constructor() {
    this.book$.next(books)
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
