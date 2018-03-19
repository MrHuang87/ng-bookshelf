import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'

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
  new Book('Title A', ['Author A', 'Author B'], 'id-3', '2001'),
  new Book('Title B', ['Author B'], 'id-4', '2008'),
]

@Injectable()
export class BookCollectionService {
  bookCollection$: Observable<Book[]> = Observable.of(books)

  constructor() { }

}
