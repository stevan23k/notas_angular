import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Tarea } from './tareas.model';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TareasService {
  private tareasUrl = 'http://localhost:3000/tareas';
  constructor(private http: HttpClient) {}

  getAllTareas(): Observable<HttpResponse<Tarea[]>> {
    return this.http.get<Tarea[]>(this.tareasUrl, {
      observe: 'response',
      withCredentials: true,
    });
  }

  createTarea(tarea: Tarea): Observable<HttpResponse<Tarea>> {
    return this.http.post<Tarea>(this.tareasUrl, tarea, {
      observe: 'response',
      withCredentials: true,
    });
  }

  deleteTarea(id: number): Observable<HttpResponse<Object>> {
    const url = `http://localhost:3000/tareas/${id}`;
    return this.http.delete(url, {
      observe: 'response',
      withCredentials: true,
    });
  }

  completeTarea(id: number): Observable<HttpResponse<Object>> {
    const url = `http://localhost:3000/tareas/complete/${id}`;
    return this.http.get(url, {
      observe: 'response',
      withCredentials: true,
    });
  }
}
