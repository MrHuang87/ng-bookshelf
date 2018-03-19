import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
// RxJs
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/delay'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/share'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/distinctUntilChanged'
// Project Files
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BookItemComponent } from './book-item/book-item.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookSearchComponent } from './book-search/book-search.component';
import { GoogleBookApiService } from './google-books-api.service';
import { BookCollectionService } from './book-collection.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BookItemComponent,
    BookListComponent,
    BookSearchComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    BrowserModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatInputModule,
    AppRoutingModule
  ],
  providers: [GoogleBookApiService, BookCollectionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
