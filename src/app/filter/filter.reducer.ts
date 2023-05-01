import { Action, createReducer, on } from '@ngrx/store';
import { filterTypes, setFilter } from './filter.actions';

export const initialState: filterTypes = 'all';

export const _filterReducer = createReducer(
  initialState,
  on(setFilter, (state, { filter }) => filter as any)
);

export function filterReducer(state: any, action: Action) {
  return _filterReducer(state, action);
}
