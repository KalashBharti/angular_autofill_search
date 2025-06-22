import { Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { ClientComponent } from './components/client/client.component';

export const routes: Routes = [
    {path: '', component: UsersComponent},
    {path: 'user', component: UsersComponent},
    {path: 'client', component: ClientComponent},
];
