import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { TareasState } from '../core/Tareas.state';
import { EstadoTarea, Tarea } from '../../services/tareas/tareas.model';

export const TareasFeature = (state: AppState) => state.Tareas;

export const selectTareasList = createSelector(TareasFeature, (state: TareasState) => state.tareas);

export const selectLoading = createSelector(TareasFeature, (state: TareasState) => state.loading);
export const selectFiltro = createSelector(TareasFeature, (state: TareasState) => state.filtro);

export const selectTareasFiltradas = createSelector(
  selectTareasList,
  selectFiltro,
  (tareas, filtro) => {
    if (filtro === EstadoTarea.todas) return tareas;
    return tareas.filter((t) => t.estado === filtro);
  },
);
