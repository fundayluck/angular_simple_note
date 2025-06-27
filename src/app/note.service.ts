import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
declare var swal: any;

export interface Note {
  id?: String;
  content: string;
  createdAt?: string;
}

@Injectable()
export class NoteService {
  private baseUrl = "http://localhost:8000/api/v1/notes";

  constructor(private http: Http) {}

  getNotes(sort: string): Observable<Note[]> {
    return this.http
      .get(this.baseUrl + `?sort=${sort}`)
      .map((res: Response): Note[] => res.json() as Note[])
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
