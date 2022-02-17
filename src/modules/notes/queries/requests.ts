import axios from "axios";

import { CreateNoteItemDto, noteItem } from "../types/note.type";

export function getNotes() {
    return axios.get("/notes").then((res) => res.data);
}

export function getNote(noteId: string) {
    return axios.get(`/notes/${noteId}`).then((res) => res.data);
}

export function addNote(note: CreateNoteItemDto) {
    return axios.post<noteItem>("/notes", note).then((res) => res.data);
}

export function deleteNote(noteId: string) {
    return axios.delete<noteItem>(`/notes/${noteId}`).then((res) => res.data);
}

export function updateNote(noteId: string, note: CreateNoteItemDto) {
    return axios
        .patch<noteItem>(`/notes/${noteId}`, note)
        .then((res) => res.data);
}
