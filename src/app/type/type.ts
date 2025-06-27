export interface Note {
  id?: string;
  content: string;
  createdAt?: string;
}

export interface NoteResponse {
  data: Note[];
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;
  success: boolean;
  message: string;
  status: number;
}
