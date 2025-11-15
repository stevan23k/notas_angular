import { Component } from '@angular/core';
import { EstadoTarea } from '../../services/tareas/tareas.model';
import { OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Tareas } from './tareas/tareas';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { LoadUser, TareasActions } from '../../state/actions/tareas.actions';
import { selectFiltro, selectUser } from '../../state/selectors/tareas.selectros';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth-service';

@Component({
  selector: 'app-principal',
  imports: [RouterModule, CommonModule, MatIconModule, Tareas],
  templateUrl: './principal.html',
  styleUrl: './principal.css',
})
export class Principal implements OnInit {
  constructor(
    private store: Store<AppState>,

    private authService: AuthService,
    private router: Router,
  ) {}

  filtro$: Observable<EstadoTarea> = new Observable();
  user$: Observable<string> = new Observable();

  EstadoTarea = EstadoTarea;

  logOut() {
    this.router.navigate(['/login']);
    this.authService.logout().subscribe();
  }

  ngOnInit() {
    this.filtro$ = this.store.select(selectFiltro);
    this.store.dispatch(LoadUser());
    this.user$ = this.store.select(selectUser);
  }

  cambiarFiltro(filtro: EstadoTarea) {
    this.store.dispatch(TareasActions.cambiarFiltro({ filtro }));
  }
}
