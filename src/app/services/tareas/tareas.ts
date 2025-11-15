import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { EstadoTarea, Tarea } from './tareas.model';
import { environment } from '../../../environments/environment';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TareasService {
  private urlApi(parametro: any) {
    if (parametro == null) {
      return environment.API_URL + '/tareas';
    }
    return environment.API_URL + `/tareas/${parametro}`;
  }
  constructor(private http: HttpClient) {}

  getAllTareas(): Observable<HttpResponse<Tarea[]>> {
    const url = this.urlApi(null);
    return this.http.get<Tarea[]>(url, {
      observe: 'response',
      withCredentials: true,
    });
  }

  createTarea(tarea: Tarea): Observable<HttpResponse<Tarea>> {
    const url = this.urlApi(null);
    return this.http.post<Tarea>(url, tarea, {
      observe: 'response',
      withCredentials: true,
    });
  }

  deleteTarea(id: number): Observable<HttpResponse<Object>> {
    const url = this.urlApi(id);
    return this.http.delete(url, {
      observe: 'response',
      withCredentials: true,
    });
  }

  completeTarea(id: number, estado: string): Observable<HttpResponse<{ tarea: Tarea }>> {
    const url = this.urlApi(`change/${id}`);
    return this.http.put<{ tarea: Tarea }>(
      url,
      { estado },
      {
        observe: 'response',
        withCredentials: true,
      },
    );
  }
}
