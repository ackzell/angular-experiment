/*
Angular supports two design approaches for interactive forms.
Template-driven forms allow you to use form-specific directives in your Angular template.
Reactive forms provide a model-driven approach to building forms.

Template-driven forms are a great choice for small or simple forms,
while reactive forms are more scalable and suitable for complex forms.
For a comparison of the two approaches, see Choosing an approach

The following example is a template-driven form app:
*/

import { Component, signal } from '@angular/core';
import { TodoDebug } from './components/todo-debug/todo-debug';
import { TodoForm } from './components/todo-form/todo-form';
import { TodoList } from './components/todo-list/todo-list';
import { TodoId } from './models/Todo';

@Component({ // <- everything inside the decorator is "component metadata"
  selector: 'app-root',
  // Components are standalone now, no more NGModules required in the app
  imports: [TodoForm, TodoList, TodoDebug], // <- components, directives and services go here.
  templateUrl: './app.html',
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
