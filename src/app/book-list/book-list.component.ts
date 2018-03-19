import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../book-collection.service';

@Component({
  selector: 'mrk-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  @Input() title: string
  @Input() books: Book[]
  @Output() onAddBook = new EventEmitter<Book>()
  @Output() onRemoveBook = new EventEmitter<Book>()

  constructor() { }

  ngOnInit() { }

}
