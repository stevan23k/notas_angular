import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { TareasService } from '../../services/tareas/tareas';
import { create } from 'node:domain';
import { LoadTareas, TareasActions } from '../actions/tareas.actions';

@Injectable()
export class TareasEffects {
  private actions$ = inject(Actions);
  private tareasSvc = inject(TareasService);

  loadTareas$ = createEffect(() => {
    return this.actions$.pipe(
      ofType('[Tareas] Load Tareas'),
      exhaustMap(() =>
        this.tareasSvc.getAllTareas().pipe(
          map((response) => ({ type: '[Tareas] Loaded Tareas', tareas: response.body })),
          catchError(() => EMPTY),
        ),
      ),
    );
  });

  completarTarea$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TareasActions.changeEstadoTarea),
      exhaustMap(({ id, estado }) =>
        this.tareasSvc.completeTarea(id, estado).pipe(
          map((response) => {
            const newTarea = response.body?.tarea;
            console.log(newTarea);
            return TareasActions.tareaChange({ tarea: newTarea! });
          }),
          catchError((error) => EMPTY),
        ),
      ),
    ),
  );

  eliminarTarea$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TareasActions.eliminarTarea),
      exhaustMap(({ id }) =>
        this.tareasSvc.deleteTarea(id).pipe(
          map((response) => LoadTareas()),
          catchError((error) => EMPTY),
        ),
      ),
    ),
  );
}
