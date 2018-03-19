import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../home/home.component';


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
