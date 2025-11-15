import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Principal } from './components/principal/principal';
import { CreateTarea } from './components/principal/create-tarea/create-tarea';
import { authGuard } from './guard/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'register',
    component: Register,
  },
  {
    canActivate: [authGuard],
    path: '',
    component: Principal,
  },
  {
    canActivate: [authGuard],
    path: 'create',
    component: CreateTarea,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
