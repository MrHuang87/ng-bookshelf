import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../book-collection.service';

@Component({
  selector: 'mrk-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss']
})
export class BookItemComponent implements OnInit {
  @Input('book') book: Book

  get title() {
    return this.book.title
  }

  get authors() {
    return this.book.authors.join(', ')
  }

  ngOnInit() { }

}
