import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoadTareas, TareasActions } from '../../../state/actions/tareas.actions';
import { Observable } from 'rxjs';
import { selectLoading, selectTareasFiltradas } from '../../../state/selectors/tareas.selectros';
import { AppState } from '../../../state/app.state';
import { AsyncPipe } from '@angular/common';
import { Tarea } from '../../../services/tareas/tareas.model';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tareas',
  imports: [RouterModule, AsyncPipe, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './tareas.html',
  styleUrl: './tareas.css',
})
export class Tareas implements OnInit {
  loading$: Observable<boolean> = new Observable();
  tareas$: Observable<Tarea[]> = new Observable();

  constructor(private store: Store<AppState>) {}
  deleteTarea(id: number) {
    this.store.dispatch(TareasActions.eliminarTarea({ id }));
  }

  changeEstado(id: number, estado: string) {
    this.store.dispatch(TareasActions.changeEstadoTarea({ id, estado: estado }));
  }

  ngOnInit() {
    this.loading$ = this.store.select(selectLoading);
    this.store.dispatch(LoadTareas());
    this.tareas$ = this.store.select(selectTareasFiltradas);
  }
}
