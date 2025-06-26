import { Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { ClientComponent } from './components/client/client.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { UnsavedChangesGuard } from './guards/unsaved-changes.guard';

export const routes: Routes = [
    {path: '', component: UsersComponent},
    {path: 'user', component: UsersComponent},
    {path: 'client', component: ClientComponent},
    {path: 'register-user', component: RegisterUserComponent,canDeactivate: [UnsavedChangesGuard]},
];
