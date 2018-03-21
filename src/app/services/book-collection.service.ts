import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Store } from '@ngrx/store';
// Project Files
import { mockBookResults } from './book/mock-books';
import { Book } from './book/book';
import * as actions from '../actions/book.actions';
import * as fromBook from '../reducers/books.reducer';

type AtoAFn<T> = (a: T) => T;
type GetAReturnA = (items: Book[]) => Book[];
type GetBReturnB$ = (items: Book[]) => Observable<Book[]>;

/** Super Immutable Book
 *  Setters wont mutate book */
class SBook {
  static setBookIsCollected: AtoAFn<Book> = b =>
    ({ ...b, isCollected: true })

  static setIsCollectedProp = (b: Book, isCollected: boolean) =>
    ({ ...b, isCollected })

  static setIsCollectedPropCurr = (isCollected: boolean) =>
    (b: Book) => ({ ...b, isCollected })

  static setBookIsNotCollected: AtoAFn<Book> = b =>
    ({ ...b, isCollected: false })

  /** Get Title Lower Cased */
  static getTitleLC = (b: Book) =>
    b.volumeInfo.title.toLowerCase()

  static isSameId = (book: Book, id: string) =>
    book.id === id

  static isNotSameId = (book: Book, id: string) =>
    !SBook.isSameId(book, id)

  static isSameIdCurr = (id: string) =>
    (book: Book) => SBook.isSameId(book, id)

  static isNotSameIdCurr = (id: string) =>
    (book: Book) => SBook.isNotSameId(book, id)

  static areTwoBooksSame = (firstBook: Book) => (secondBook: Book): boolean =>
    secondBook !== firstBook
}

/** Simple Compare function for strings */
const compareString = (a: string, b: string): number => {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  } else {
    return 0;
  }
};

const filter = <T>(predicate: (item: T) => boolean) =>
  (items: T[]) => items.filter(predicate);

/** Curried: Given a compare function will return curried function. */
const sort = <T>(compare: (a: T, b: T) => number) =>
  (arr: T[]) => arr.sort(compare);

const map = <T>(transformFn: AtoAFn<T>) =>
  (arr: T[]) => arr.map(transformFn);

/** Compare function for book titles */
const compareByBookTitle = (a: Book, b: Book): number =>
  compareString(SBook.getTitleLC(a), SBook.getTitleLC(b));

export class SBooks {

  static setAllBooksToIsCollected = map(SBook.setBookIsCollected);

  static sortByTitle = sort(compareByBookTitle);

  static isBookCollected = (bookA: Book, myCollection: Book[]) =>
    !!myCollection.find(bookB => bookB.id === bookA.id)

  static isBookCollectedCurr = (myCollection: Book[]) =>
    (a: Book) => SBooks.isBookCollected(a, myCollection)

  static setIsCollectedOnResults = (searchResult: Book[], collection: Book[]): Book[] =>
    searchResult.map(b => SBook.setIsCollectedProp(b, SBooks.isBookCollected(b, collection)))

  static sortBookCurr = (books: Book[]) =>
    SBooks.sortByTitle(books)

  static addBook = (addMe: Book, books: Book[]): Book[] =>
    [...books, addMe]

  static addBookCurr = (addMe: Book) =>
    (books: Book[]): Book[] => SBooks.addBook(addMe, books)

  static getTotal = (books: Book[]) => books.length;

  static rmBookById = (id: string, books: Book[]) =>
    filter(SBook.isNotSameIdCurr(id))(books)

  static rmBookByIdCurr = (id: string) =>
    filter(SBook.isNotSameIdCurr(id))
}

@Injectable()
export class BookCollectionService {
  book$ = new ReplaySubject<Book[]>(1);

  constructor(
    private store: Store<fromBook.State>
  ) {
    this.loadDefaultBooks();
  }

  loadDefaultBooks() {
    // const defaultBooks: Book[] = SBooks.setAllBooksToIsCollected(mockBookResults);
    // this.book$.next(defaultBooks);
    this.store.dispatch(new actions.Load(mockBookResults));
  }

  updateBooks(callback: (books: Book[]) => Book[]) {
    this.book$
      .take(1)
      .map(books => callback(books))
      .do(books => this.book$.next(books))
      .subscribe();
  }

  sortBooksByTitle() {
    const cb = SBooks.sortBookCurr;
    this.updateBooks(cb);
  }

  addBook(bookToAdd: Book) {
    bookToAdd = SBook.setBookIsCollected(bookToAdd);
    const cb = SBooks.addBookCurr(bookToAdd);
    this.updateBooks(cb);
  }

  removeBook(bookToRemove: Book) {
    const removeBook = (removeMe: Book): GetAReturnA => books => {
      const book = SBook.setBookIsNotCollected(removeMe);
      return SBooks.rmBookById(removeMe.id, books);
    };
    const cb = removeBook(bookToRemove);
    this.updateBooks(cb);
  }

}
