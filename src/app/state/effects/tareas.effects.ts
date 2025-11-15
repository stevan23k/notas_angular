import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { TareasService } from '../../services/tareas/tareas';
import { create } from 'node:domain';
import { LoadTareas, LoadUser, TareasActions, UserLoaded } from '../actions/tareas.actions';
import { AuthService } from '../../services/auth/auth-service';
import { Router } from '@angular/router';

@Injectable()
export class TareasEffects {
  private actions$ = inject(Actions);
  private tareasSvc = inject(TareasService);
  private authService = inject(AuthService);
  private Router = inject(Router);

  loadTareas$ = createEffect(() => {
    return this.actions$.pipe(
      ofType('[Tareas] Load Tareas'),
      exhaustMap(() =>
        this.tareasSvc.getAllTareas().pipe(
          map((response) => ({ type: '[Tareas] Loaded Tareas', tareas: response.body })),
          catchError((error) => {
            return EMPTY;
          }),
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
          catchError((error) => {
            return EMPTY;
          }),
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
          catchError((error) => {
            return EMPTY;
          }),
        ),
      ),
    ),
  );
  loadUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoadUser),
      exhaustMap(() =>
        this.authService.User().pipe(
          map((response) => UserLoaded({ user: response.body?.nombre! })),
          catchError((error) => {
            return EMPTY;
          }),
        ),
      ),
    );
  });
}
