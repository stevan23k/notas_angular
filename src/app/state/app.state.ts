import { ActionReducerMap } from '@ngrx/store';
import { TareasState } from './core/Tareas.state';
import { TareasReducer } from './reducers/tareas.reducers';

export interface AppState {
  Tareas: TareasState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  Tareas: TareasReducer,
};
