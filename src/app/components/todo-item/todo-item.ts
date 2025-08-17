import { Component, input, output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Todo, TodoId } from "../../models/Todo";

@Component({
  selector: 'todo-item',
  imports: [FormsModule],
  template: `
    <div class="todo-item">
      <input [id]="todo().id" name="is-done" type="checkbox" [(ngModel)]="todo().completed" />
      <label [for]="todo().id" class="todo-title">
        <div class="todo-text">{{ todo().title }}</div>
      </label>
      <button (click)="removeTodo(todo().id)">×</button>
    </div>
  `,
  styleUrl: './todo-item.scss'
})

export class TodoItem {
  todo = input<Todo>({
    completed: false,
    id: crypto.randomUUID(),
    title: ''
  });

  remove = output<TodoId>();

  removeTodo(id: TodoId) {
    this.remove.emit(id);
  }
}
