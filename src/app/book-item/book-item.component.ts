import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../model/books'

@Component({
  selector: 'mrk-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss']
})
export class BookItemComponent implements OnInit {
  @Input('book') book: Book
  @Output() onAddBook = new EventEmitter<Book>()
  @Output() onRemoveBook = new EventEmitter<Book>()

  ngOnInit() { }

  addBook() {
    this.onAddBook.emit(this.book)
  }

  removeBook() {
    this.onRemoveBook.emit(this.book)
  }

  get isCollected() {
    return this.book.isCollected
  }

  get description() {
    const { description = '' } = this.book.volumeInfo
    if (!description)
      return ''
    else if (description.length > 300)
      return description.substr(0, 300) + '..'
    else
      return description
  }

  get price(): string {
    const { listPrice } = this.book.saleInfo;
    if (!listPrice)
      return ''
    else if (listPrice.currencyCode)
      return 'Price: ' + listPrice.amount + ' ' + listPrice.currencyCode
    else
      return 'Price: ' + listPrice.amount
  }

  get title() {
    return this.book.volumeInfo.title
  }

  get authors() {
    if (this.book.volumeInfo.authors)
      return this.book.volumeInfo.authors.join(', ')
    else return ''
  }

}
