import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Todo } from '../models/todo.model';
import { filterTypes } from 'src/app/filter/filter.actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  currentFilter: filterTypes;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.subscribe(({ todos, filter }) => {
      this.todos = todos;
      this.currentFilter = filter;
    });
  }
}
