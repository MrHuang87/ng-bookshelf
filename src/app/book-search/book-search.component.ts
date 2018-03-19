import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mrk-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {

  @Output() onSearchTerm = new EventEmitter<string>()
  @Output() onClear = new EventEmitter<true>()

  value = ''

  ngOnInit() { }

  clearInput() {
    this.value = ''
    this.onClear.emit(true)
  }

  get isSearchEmpty(): boolean {
    return this.value === ''
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
