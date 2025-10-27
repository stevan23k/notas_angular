import { Component, computed, signal } from '@angular/core';
import { TareasService } from '../../services/tareas/tareas';
import { EstadoTarea, Tarea } from '../../services/tareas/tareas.model';
import { OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { error } from 'node:console';

type Filter = 'todas' | 'completadas' | 'pendientes' | 'en_progreso' | 'eliminadas';

@Component({
  selector: 'app-principal',
  imports: [RouterModule, CommonModule, MatIconModule],
  templateUrl: './principal.html',
  styleUrl: './principal.css',
})
export class Principal implements OnInit {
  constructor(
    private TareasSrv: TareasService,
    private router: Router,
  ) {}

  tareas = signal<Tarea[]>([]);
  filter = signal<Filter>('todas');

  tareasVisibles = computed(() => {
    const tareas = this.tareas();
    const filter = this.filter();

    if (filter === 'completadas') {
      return tareas.filter((t) => t.estado === EstadoTarea.completada);
    }

    if (filter === 'pendientes') {
      return tareas.filter((t) => t.estado === EstadoTarea.pendiente);
    }

    if (filter === 'en_progreso') {
      return tareas.filter((t) => t.estado === EstadoTarea.enProgreso);
    }

    if (filter === 'eliminadas') {
      return tareas.filter((t) => t.estado === EstadoTarea.eliminada);
    }

    return tareas;
  });

  changeFilter(filter: Filter) {
    this.filter.set(filter);
  }

  getTareas() {
    this.TareasSrv.getAllTareas().subscribe({
      next: (data) => {
        console.log(data);
        this.tareas.set(data.body as Tarea[]);
      },
      error: (error) => {
        if (error.status === 401) {
          // alert('Debes iniciar sesión para ver las tareas');
          this.router.navigate(['/login']);
        }
      },
    });
  }

  ngOnInit() {
    this.getTareas();
  }

  deleteTarea(id: number) {
    this.TareasSrv.deleteTarea(id).subscribe({
      next: (data) => {
        console.log('tarea eliminada con exito');
        this.getTareas();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  completeTarea(id: number) {
    this.TareasSrv.completeTarea(id).subscribe({
      next: (response) => {
        console.log(response);
        this.getTareas();
      },
      error: (error) => {
        console.log('mal');
      },
    });
  }
}
