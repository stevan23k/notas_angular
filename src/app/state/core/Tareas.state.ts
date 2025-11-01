import { EstadoTarea, Tarea } from '../../services/tareas/tareas.model';
export interface TareasState {
  loading: boolean;
  tareas: Tarea[];
  filtro: EstadoTarea;
}
