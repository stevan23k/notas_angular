import { createReducer, on } from '@ngrx/store';

import { LoadTareas, TareasActions } from '../actions/tareas.actions';
import { EstadoTarea, Tarea } from '../../services/tareas/tareas.model';
import { TareasState } from '../core/Tareas.state';

export const initialState: TareasState = { loading: false, tareas: [], filtro: EstadoTarea.todas };

export const TareasReducer = createReducer(
  initialState,
  on(TareasActions.cambiarFiltro, (_state, { filtro }) => ({
    ..._state,
    filtro,
  })),
  on(LoadTareas, (_state) => {
    return { ..._state, loading: true };
  }),
  on(TareasActions.loadedTareas, (_state, { tareas }) => {
    return { ..._state, tareas, loading: false };
  }),
  on(TareasActions.tareaChange, (_state, { tarea }) => {
    const tareaActulizada = _state.tareas.map((t) => (t.id === tarea.id ? tarea : t));
    return {
      ..._state,
      tareas: tareaActulizada,
    };
  }),
  on(TareasActions.eliminarTarea, (_state, { id }) => {
    return { id, ..._state };
  }),
);
