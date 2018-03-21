import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import { Book } from '../services/book/book';
import * as actions from '../actions/book.actions';

export const bookAdapter = createEntityAdapter<Book>();
export interface State extends EntityState<Book> { }

export const initialState: State = bookAdapter.getInitialState();

export function bookReducer(state: State = initialState, action: actions.BookActions) {
  let never: never;

  switch (action.type) {

    case actions.CREATE:
      return bookAdapter.addOne(action.book, state);

    case actions.UPDATE:
      return bookAdapter.updateOne({
        id: action.id,
        changes: action.changes,
      }, state);

    case actions.DELETE:
      return bookAdapter.removeOne(action.id, state);

    case actions.LOAD:
      return bookAdapter.addMany(action.books, state);

    default:
      never = action;
      return state;
  }

}

export const getBookState = createFeatureSelector<State>('book');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = bookAdapter.getSelectors(getBookState);
