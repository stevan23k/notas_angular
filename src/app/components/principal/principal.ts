import { Component, computed, signal } from '@angular/core';
import { TareasService } from '../../services/tareas/tareas';
import { EstadoTarea, Tarea } from '../../services/tareas/tareas.model';
import { OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Tareas } from './tareas/tareas';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { TareasActions } from '../../state/actions/tareas.actions';
import { selectFiltro } from '../../state/selectors/tareas.selectros';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-principal',
  imports: [RouterModule, CommonModule, MatIconModule, Tareas],
  templateUrl: './principal.html',
  styleUrl: './principal.css',
})
export class Principal implements OnInit {
  constructor(
    private store: Store<AppState>,
    private cookies: CookieService,
  ) {}

  filtro$: Observable<EstadoTarea> = new Observable();
  obtenerCokkie() {
    console.log(this.cookies.get('token'));
    return this.cookies.get('token');
  }

  EstadoTarea = EstadoTarea;

  ngOnInit() {
    this.filtro$ = this.store.select(selectFiltro);
    this.obtenerCokkie();
  }

  cambiarFiltro(filtro: EstadoTarea) {
    this.store.dispatch(TareasActions.cambiarFiltro({ filtro }));
  }
}
