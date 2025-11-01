import { createActionGroup, props, createAction } from '@ngrx/store';
import { EstadoTarea, Tarea } from '../../services/tareas/tareas.model';

export const TareasActions = createActionGroup({
  source: 'Tareas',
  events: {
    'ChangeEstado Tarea': props<{ id: number; estado: string }>(),
    'Tarea Change': props<{ tarea: Tarea }>(),

    'Eliminar Tarea': props<{ id: number }>(),
    'Tarea eliminada': props<{ tarea: Tarea }>(),

    'Loaded Tareas': props<{ tareas: Tarea[] }>(),

    'cambiar filtro': props<{ filtro: EstadoTarea }>(),
  },
});

export const LoadTareas = createAction('[Tareas] Load Tareas');
