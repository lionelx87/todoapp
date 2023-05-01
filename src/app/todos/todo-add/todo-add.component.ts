import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { createTodo } from '../todo.actions';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss'],
})
export class TodoAddComponent implements OnInit {
  textInput: FormControl;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.textInput = new FormControl('', Validators.required);
  }

  add() {
    if (this.textInput.valid) {
      this.store.dispatch(createTodo({ text: this.textInput.value }));
      this.textInput.reset();
    }
  }
}
