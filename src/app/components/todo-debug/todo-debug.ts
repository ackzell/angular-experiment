import { JsonPipe } from "@angular/common";
import { Component, input } from "@angular/core";
import { Todo } from "../../models/Todo";

@Component({
  selector: 'todo-debug',
  imports: [JsonPipe],
  template: `
    <div class="todo-debug">
      <h2>Debug</h2>
      <pre>{{ todos() | json }}</pre>
    </div>
  `,
  styles: `
    .todo-debug {
      overflow: scroll;
      border: 1px solid #ccc;
      border-radius: 0.8rem;
      padding: 1.2rem;
      background-color: ghostwhite;

      h2 {
        font-family: monospace
      }
    }
  `
})
export class TodoDebug {
  todos = input<Todo[]>();
}
