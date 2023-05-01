import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import {
  Subscription,
  debounceTime,
  filter,
  fromEvent,
  merge,
  tap,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { deleteTodo, editTodo, toggleTodo } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly ENTER_KEY = 13;
  @Input() todo: Todo;
  @ViewChild('input') input: ElementRef;
  @ViewChild('label') label: ElementRef;

  events: Subscription[] = [];

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

  ngAfterViewInit(): void {
    const dblClickEvent$ = fromEvent(this.label.nativeElement, 'dblclick')
      .pipe(
        tap(() => {
          this.editing = true;
          this.txtInput.setValue(this.todo.text);
        }),
        debounceTime(0)
      )
      .subscribe((_) => {
        this.input.nativeElement.select();
      });

    const losingFocus$ = merge(
      fromEvent(this.input.nativeElement, 'blur'),
      fromEvent(this.input.nativeElement, 'keydown').pipe(
        filter((event: any) => event.keyCode === this.ENTER_KEY)
      )
    ).subscribe((_) => {
      this.editing = false;
      if (this.txtInput.valid) {
        this.store.dispatch(
          editTodo({ id: this.todo.id, text: this.txtInput.value })
        );
      }
    });

    this.events.push(dblClickEvent$);
    this.events.push(losingFocus$);
  }

  delete() {
    this.store.dispatch(deleteTodo({ id: this.todo.id }));
  }

  ngOnDestroy(): void {
    this.events.forEach((subscription) => subscription.unsubscribe());
  }
}
