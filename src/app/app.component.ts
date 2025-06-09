import { Component } from '@angular/core';

import { UsersComponent } from './components/users/users.component';

@Component({
  selector: 'app-root',
  imports: [ UsersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'search_component';
}
