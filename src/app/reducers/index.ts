import { ActionReducerMap } from '@ngrx/store';
import { bookReducer } from './books.reducer';

export const reducers: ActionReducerMap<any> = {
  book: bookReducer
};
