import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { environment } from "./environment/environment";
import { Note, NoteResponse } from "./type/type";

declare var swal: any;

@Injectable()
export class NoteService {
  private baseUrl = environment.apiBaseUrl + "/api/v1/notes";

  constructor(private http: Http) {}

  getNotes(sort: string, page: number, size: number): Observable<NoteResponse> {
    return this.http
      .get(this.baseUrl + `?sort=${sort}&page=${page}&size=${size}`)
      .map((res: Response): NoteResponse => res.json() as NoteResponse)
      .catch(this.handleError);
  }

  addNote(note: Note): Observable<Note> {
    return this.http
      .post(this.baseUrl, note)
      .map((res: Response): Note => res.json() as Note)
      .catch(this.handleError);
  }

  deleteNote(id: String): Observable<void> {
    return this.http
      .delete(`${this.baseUrl}/${id}`)
      .map((): void => null)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error("Terjadi error:", error);

    // Tampilkan SweetAlert
    swal("Error", "Terjadi kesalahan pada server (500).", "error");

    return Observable.throw(error);
  }
}
