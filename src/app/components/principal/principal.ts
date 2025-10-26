import { Component } from '@angular/core';
import { TareasService } from '../../services/tareas/tareas';
import { Tarea } from '../../services/tareas/tareas.model';
import { OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-principal',
  imports: [RouterModule, CommonModule],
  templateUrl: './principal.html',
  styleUrl: './principal.css',
})
export class Principal implements OnInit {
  constructor(
    private TareasSrv: TareasService,
    private router: Router,
  ) {}
  tareas: Tarea[] = [];

  ngOnInit() {
    this.TareasSrv.getAllTareas().subscribe({
      next: (data) => {
        console.log(data);
        this.tareas = data.body as Tarea[];
      },
      error: (error) => {
        if (error.status === 401) {
          alert('Debes iniciar sesión para ver las tareas');
          this.router.navigate(['/login']);
        }
      },
    });
  }
}
