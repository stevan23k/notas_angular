import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TareasService } from '../../../services/tareas/tareas';
import { HttpErrorResponse } from '@angular/common/http';
import { EstadoTarea } from '../../../services/tareas/tareas.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-create-tarea',
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './create-tarea.html',
  styleUrl: './create-tarea.css',
})
export class CreateTarea {
  constructor(
    private tareasSvc: TareasService,
    private router: Router,
  ) {}
  errorMessage: string = '';

  createTareaForm = new FormGroup({
    nombre: new FormControl<string>('', { nonNullable: true }),
    descripcion: new FormControl<string>('', { nonNullable: true }),
    estado: new FormControl<EstadoTarea>(EstadoTarea.enProgreso, { nonNullable: true }),
  });

  createTarea() {
    const newTarea = {
      nombre: this.createTareaForm.value.nombre ?? '',
      descripcion: this.createTareaForm.value.descripcion ?? '',
      estado: this.createTareaForm.value.estado ?? EstadoTarea.enProgreso,
    };
    this.tareasSvc.createTarea(newTarea).subscribe({
      next: (response) => {
        if (response.status === 201) {
          this.router.navigate(['']);
          alert('Tarea creada con éxito');
        }
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
          alert('Debes iniciar sesión para crear una tarea');
        }
        console.log(error);
        this.errorMessage = 'la logitud de la descripcion debe superar los 15 carapteres';
      },
    });
  }
}
