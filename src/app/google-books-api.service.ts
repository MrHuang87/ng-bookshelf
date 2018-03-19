import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export class Book {
  constructor(
    public title: string,
    public authors: string[],
    public id: string,
    public publishedDate: string,
    public isCollected = false
  ) { }
}

export let mockBookResults = [
  new Book('Search Result A', ['author c'], 'id-3', '2001'),
  new Book('Search Result B', ['author d'], 'id-4', '2008'),
]

@Injectable()
export class GoogleBookApiService {

  searchBook(term: string): Observable<Book[]> {
    let output = mockBookResults.map((book, ind) => ({ ...book, title: `${term}-${ind}` }))
    return Observable
      .of(output)
      .do(books => console.log({ books }))
      .delay(1000)
  }

}
