import { Component } from "@angular/core";
import { Note, NoteService } from "./note.service";

declare var swal: any;

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  notes: Note[] = [];
  noteText: string = "";
  sortOrder: string = "newest";
  sortValue: boolean = true;

  constructor(private noteService: NoteService) {}

  ngOnInit() {
    this.loadNotes();
  }

  loadNotes() {
    this.noteService.getNotes(this.sortOrder).subscribe((data: any) => {
      this.notes = data.data;
    });
  }

  addNote() {
    if (!this.noteText.trim()) {
      swal("perhatian", "catatan tidak boleh kosong!", "warning");
      return;
    }

    this.noteService.addNote({ content: this.noteText }).subscribe(() => {
      this.noteText = "";
      this.loadNotes();
    });
  }

  deleteNote(noteId: String) {
    this.noteService.deleteNote(noteId).subscribe(() => {
      this.notes = this.notes.filter((n) => n.id !== noteId);
    });
  }

  onToggleSort() {
    this.sortOrder = this.sortValue ? "newest" : "oldest";
    this.loadNotes();
  }
}
