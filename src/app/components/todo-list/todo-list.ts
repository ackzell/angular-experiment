import { Component, input, output } from "@angular/core";
import { Todo, TodoId } from "../../models/Todo";
import { TodoItem } from "../todo-item/todo-item";

@Component({
  selector: 'todo-list',
  imports: [TodoItem],
  template: `
    <div class="todo-list">
      @for (todo of todos(); track todo.id) {
        <todo-item [todo]="todo" (remove)="removeTodo($event)"></todo-item>
      }
    </div>
  `
})
export class TodoList {
  todos = input<Todo[]>();
  remove = output<TodoId>();

  removeTodo(id: TodoId) {
    this.remove.emit(id);
  }
}
