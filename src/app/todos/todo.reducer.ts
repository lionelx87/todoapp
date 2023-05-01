import { Action, createReducer, on } from '@ngrx/store';
import {
  clearAllCompleted,
  createTodo,
  deleteTodo,
  editTodo,
  toggleAllTodo,
  toggleTodo,
} from './todo.actions';
import { Todo } from './models/todo.model';

export const initialState: Todo[] = [
  new Todo('Prueba'),
  new Todo('Prueba2'),
  new Todo('Prueba3'),
  new Todo('Prueba4'),
];

export const _todoReducer = createReducer(
  initialState,
  on(createTodo, (state, { text }) => [...state, new Todo(text)]),
  on(toggleTodo, (state, { id }) => {
    return state.map((todo) => {
      if (todo.id == id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });
  }),
  on(editTodo, (state, { id, text }) => {
    return state.map((todo) => {
      if (todo.id == id) {
        return {
          ...todo,
          text,
        };
      }
      return todo;
    });
  }),
  on(deleteTodo, (state, { id }) => state.filter((todo) => todo.id != id)),
  on(toggleAllTodo, (state, { completed }) =>
    state.map((todo) => ({
      ...todo,
      completed,
    }))
  ),
  on(clearAllCompleted, (state) => state.filter((todo) => !todo.completed))
);

export function todoReducer(state: any, action: Action) {
  return _todoReducer(state, action);
}
