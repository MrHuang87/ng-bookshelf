import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../book-collection.service';

@Component({
  selector: 'mrk-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  @Input() books: Book[]

  constructor() { }

  ngOnInit() { }

}
