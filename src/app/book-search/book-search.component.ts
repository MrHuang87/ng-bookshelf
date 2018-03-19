import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mrk-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {

  @Output() onSearchTerm = new EventEmitter<string>()
  @Output() onClear = new EventEmitter<true>()

  searchTerm = ''

  ngOnInit() { }

  clearInput() {
    this.searchTerm = ''
    this.onClear.emit(true)
  }

  get isSearchEmpty(): boolean {
    return this.searchTerm === ''
  }

  onInput(term) {
    if (this.isSearchEmpty) {
      this.clearInput()
    }
    else {
      this.onSearchTerm.emit(term)
    }
  }

}
