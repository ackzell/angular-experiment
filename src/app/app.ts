/*
Angular supports two design approaches for interactive forms.
Template-driven forms allow you to use form-specific directives in your Angular template.
Reactive forms provide a model-driven approach to building forms.

Template-driven forms are a great choice for small or simple forms,
while reactive forms are more scalable and suitable for complex forms.
For a comparison of the two approaches, see Choosing an approach

The following example is a template-driven form app:
*/

import { JsonPipe } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

type TodoId = ReturnType<typeof crypto.randomUUID>;

export interface Todo {
  id: TodoId;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'todo-item',
  imports: [FormsModule],
  template: `
    <div class="todo-item">
      <input type="checkbox" [(ngModel)]="todo().completed" />
      <span>{{ todo().title }}</span>
      <button (click)="removeTodo(todo().id)">X</button>
    </div>
  `
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


@Component({
  selector: 'todo-debug',
  imports: [JsonPipe],
  template: `
    <div class="todo-debug">
      <pre>{{ todos() | json }}</pre>
    </div>
  `
})
export class TodoDebug {
  todos = input<Todo[]>();
}

@Component({ // <- everything inside the decorator is "component metadata"
  selector: 'app-root',
  // Components are standalone now, no more NGModules required in the app
  imports: [TodoForm, TodoList, TodoDebug], // <- components, directives and services go here.
  template: `
    <todo-form (submissionEvent)="addTodo($event)" />
    <todo-list [todos]="todos()" (remove)="removeTodo($event)" />
    <todo-debug [todos]="todos()"/>
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
    if (title.trim() === '') {
      return;
    }
    console.log('[App addTodo]: it arrived as: ', title);
    this.todos.update(todos => [...todos, { id: crypto.randomUUID(), title, completed: false }]);
  }

  removeTodo(id: TodoId) {
    this.todos.update(todos => todos.filter(todo => todo.id !== id));
  }
}
