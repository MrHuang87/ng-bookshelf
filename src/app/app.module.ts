import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
// RxJs
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/distinctUntilChanged';
// Project Files
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './containers/home/home.component';
import { BookItemComponent } from './components/book-item/book-item.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookSearchComponent } from './components/book-search/book-search.component';
import { GoogleBookApiService } from './services/google-books-api.service';
import { BookCollectionService } from './services/book-collection.service';

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
    HttpClientModule,
    FormsModule,
    BrowserModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatInputModule,
    AppRoutingModule
  ],
  providers: [GoogleBookApiService, BookCollectionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
