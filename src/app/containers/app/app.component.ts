import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  template: `
    <h1 class="uk-heading-line uk-text-center uk-margin-top"><span>Todo Angular Node</span></h1>
    <router-outlet class=".uk-align-center"></router-outlet>
  `,
})
export class AppComponent {
  title = 'ng-todo-node';
}
