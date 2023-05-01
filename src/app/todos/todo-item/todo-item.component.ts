import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { deleteTodo, editTodo, toggleTodo } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @ViewChild('input') input: ElementRef;

  checkCompleted: FormControl;
  txtInput: FormControl;

  editing: boolean = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.checkCompleted = new FormControl(this.todo.completed);
    this.txtInput = new FormControl(this.todo.text, Validators.required);

    this.checkCompleted.valueChanges.subscribe((_) => {
      this.store.dispatch(toggleTodo({ id: this.todo.id }));
    });
  }

  edit() {
    this.editing = true;
    this.txtInput.setValue(this.todo.text);
    setTimeout(() => {
      this.input.nativeElement.select();
    }, 0);
  }

  editFinish() {
    this.editing = false;
    if (this.txtInput.valid) {
      this.store.dispatch(
        editTodo({ id: this.todo.id, text: this.txtInput.value })
      );
    }
  }

  delete() {
    this.store.dispatch(deleteTodo({ id: this.todo.id }));
  }
}
