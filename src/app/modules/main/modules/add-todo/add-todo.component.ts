import { Component, OnInit } from '@angular/core';
import {TodoService} from '../../../../common/services/todo/todo.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TodoComponentClass} from '../../../../common/classes/todo-components.class';
import {FormControl, FormGroup} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {TodoItem} from '../../../../common/services/common/interfaces/todo-item';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent extends TodoComponentClass implements OnInit {

  private _todoItem: TodoItem;

  public form: FormGroup = new FormGroup({
    task: new FormControl('')
  });

  constructor(
    private _todoService: TodoService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    super();
  }

  public ngOnInit(): void {
    this._todoItem = (<BehaviorSubject<{[key: string]: TodoItem}>>this._route.data).value['0'];
    if (this._todoItem) {
      this.form.patchValue(this._todoItem);
    }
  }

  public navToList(): void {
    this._router.navigate(['/main/list']);
  }

  public onClickSave(): void {
    const todoItem: TodoItem = {
      id: this._todoItem?.id,
      task: this.form.get('task').value,
      publicationDate: (new Date()).toISOString()
    };
    this._todoService.addTodoItem(todoItem).then(() => this.navToList());
  }
}
