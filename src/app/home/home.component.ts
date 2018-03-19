import { Component, OnInit } from '@angular/core';

export class Book {
  constructor(
    public title: string,
    public authors: string[],
    public id: string,
    public publishedDate: string,
  ) { }
}

export let books = [
  new Book('Title A', ['Author A', 'Author B'], 'id-3', '2001'),
  new Book('Title B', ['Author B'], 'id-4', '2008'),
]

@Component({
  selector: 'mrk-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  books = books

}
