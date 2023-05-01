import { createAction, props } from '@ngrx/store';

export const createTodo = createAction(
  '[TODO create] Create Todo',
  props<{ text: string }>()
);

export const toggleTodo = createAction(
  '[TODO toggle] Toggle Todo',
  props<{ id: number }>()
);

export const editTodo = createAction(
  '[TODO edit] Edit Todo',
  props<{ id: number; text: string }>()
);

export const deleteTodo = createAction(
  '[TODO delete] Delete Todo',
  props<{ id: number }>()
);

export const toggleAllTodo = createAction(
  '[TODO toggle all] Toggle All Todo',
  props<{ completed: boolean }>()
);

export const clearAllCompleted = createAction(
  '[TODO clear all completed] Clear All Completed Todo'
);
