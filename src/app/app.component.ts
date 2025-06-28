import { Component } from "@angular/core";
import { NoteService } from "./note.service";
import { Note, NoteResponse } from "./type/type";

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
  currentPage: number = 1;
  pageSize: number = 5;
  totalCount: number = 0;

  constructor(private noteService: NoteService) {}

  ngOnInit() {
    this.loadNotes();
  }

  loadNotes() {
    this.noteService
      .getNotes(this.sortOrder, this.currentPage, this.pageSize)
      .subscribe((res: NoteResponse) => {
        this.notes = res.data;
        this.totalCount = res.totalItems;
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

  deleteNote(noteId: string) {
    swal({
      title: "Are you sure?",
      text: "This note will be permanently deleted.",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then((willDelete: boolean) => {
      if (willDelete) {
        this.noteService.deleteNote(noteId).subscribe(() => {
          if (this.notes.length === 1 && this.currentPage > 1) {
            this.currentPage--;
          }

          this.loadNotes();

          swal("Note deleted successfully!", {
            icon: "success",
          });
        });
      }
    });
  }

  onToggleSort() {
    this.sortOrder = this.sortValue ? "newest" : "oldest";
    this.loadNotes();
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadNotes();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalCount / this.pageSize);
  }
}
