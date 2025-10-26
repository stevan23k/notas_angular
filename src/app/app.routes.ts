import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Principal } from './components/principal/principal';
import { CreateTarea } from './components/principal/create-tarea/create-tarea';

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
    path: '',
    component: Principal,
  },
  {
    path: 'create',
    component: CreateTarea,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
