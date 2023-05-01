import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { filterTypes, setFilter } from 'src/app/filter/filter.actions';
import { clearAllCompleted } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.scss'],
})
export class TodoFooterComponent implements OnInit {
  currentFilter: filterTypes = 'all';
  filters: filterTypes[] = ['all', 'completed', 'pending'];

  pendings: number = 0;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    // this.store.select('filter').subscribe((filter) => {
    //   console.log(filter);
    //   this.currentFilter = filter;
    // });

    this.store.subscribe((state) => {
      this.currentFilter = state.filter;
      this.pendings = state.todos.filter((todo) => !todo.completed).length;
    });
  }

  changeFilter(filter: filterTypes) {
    this.store.dispatch(setFilter({ filter }));
  }

  clearAll() {
    this.store.dispatch(clearAllCompleted());
  }
}
