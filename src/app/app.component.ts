import { Component } from '@angular/core';

import { UsersComponent } from './components/users/users.component';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [UsersComponent, SidebarComponent,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'search_component';
}
