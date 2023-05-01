import { createAction, props } from '@ngrx/store';

export type filterTypes = 'all' | 'completed' | 'pending';

export const setFilter = createAction(
  '[Filter] Set Filter',
  props<{ filter: filterTypes }>()
);
