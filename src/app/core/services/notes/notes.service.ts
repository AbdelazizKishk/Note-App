import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private httpClient: HttpClient) {}

  addnote(data: object): Observable<any> {
    return this.httpClient.post(`${enviroment.baseUrl}/api/v1/notes`, data);
  }
  getnote(): Observable<any> {
    return this.httpClient.get(`${enviroment.baseUrl}/api/v1/notes/allNotes`);
  }
  getUserNotes(): Observable<any> {
    return this.httpClient.get(`${enviroment.baseUrl}/api/v1/notes`);
  }
  updateNote(noteId: string, data: object): Observable<any> {
    return this.httpClient.put(
      `${enviroment.baseUrl}/api/v1/notes/${noteId}`,
      data
    );
  }
  deleteNote(noteId: string): Observable<any> {
    return this.httpClient.delete(
      `${enviroment.baseUrl}/api/v1/notes/${noteId}`
    );
  }
}
