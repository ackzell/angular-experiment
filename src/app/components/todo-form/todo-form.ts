import { Component, output } from "@angular/core";
import { FormsModule } from "@angular/forms";

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
  `,
  styleUrl: './todo-form.scss'
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
