/*
Angular supports two design approaches for interactive forms.
Template-driven forms allow you to use form-specific directives in your Angular template.
Reactive forms provide a model-driven approach to building forms.

Template-driven forms are a great choice for small or simple forms,
while reactive forms are more scalable and suitable for complex forms.
For a comparison of the two approaches, see Choosing an approach

The following example is a template-driven form app:
*/

import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface Todo {
  id: ReturnType<typeof crypto.randomUUID>;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'todo-item',
  template: `
    <div class="todo-item">
      <input type="checkbox" [checked]="todo().completed" />
      <span>{{ todo().title }}</span>
    </div>
  `
})

export class TodoItem {
  todo = input<Todo>({
    completed: false,
    id: crypto.randomUUID(),
    title: ''
  });

}

@Component({
  selector: 'todo-list',
  imports: [TodoItem],
  template: `
    Hello from todo-list
    <div class="todo-list">
      @for (todo of todos(); track todo.id) {
        <todo-item [todo]="todo"></todo-item>
      }
    </div>
  `
})
export class TodoList {
  todos = input<Todo[]>([]);
}

@Component({
  selector: 'todo-form',
  imports: [FormsModule], // <- 1. need to bring in the forms module
  template: `
    <div class="todo-form">
      <form (submit)="submit($event)">
        <!-- 2. so I can add two way data binding -->
        <input autofocus  name="todo-title" type="text" [(ngModel)]="title" />
        <button type="submit">Add</button>
      </form>
    </div>
  `
})
export class TodoForm {
  // emit an event with the new todo title when the form is submitted

  submissionEvent = output<string>();

  title = '';

  submit(ev: SubmitEvent) {
    ev.preventDefault()
    console.log('[TodoForm submit]: yo! it was submitted')
    this.submissionEvent.emit(this.title);
    this.title = '';
  }
}

@Component({ // <- everything inside the decorator is "component metadata"
  selector: 'app-root',
  // Components are standalone now, no more NGModules required in the app
  imports: [TodoForm, TodoList], // <- components, directives and services go here.
  template: `
  <todo-form (submissionEvent)="addTodo($event)"></todo-form>
    <todo-list [todos]="todos()"></todo-list>
  `,
  styleUrl: './app.scss' // <- styles are scoped by default
})
export class App {

  protected readonly todos = signal([
    { id: crypto.randomUUID(), title: 'Learn Angular 20', completed: false },
    { id: crypto.randomUUID(), title: 'Refresh concepts from AngularJS', completed: true },
    { id: crypto.randomUUID(), title: 'Be nostalgic', completed: false }
  ]);

  addTodo(title: string) {
    console.log('[App addTodo]: it arrived as: ', title);
    this.todos.update(todos => [...todos, { id: crypto.randomUUID(), title, completed: false }]);
  }
}
