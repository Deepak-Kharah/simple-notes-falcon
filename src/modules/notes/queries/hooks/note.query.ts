import { useMutation, useQuery, useQueryClient } from "react-query";
import {
    CreateNoteItemDto,
    noteItem,
    UpdateNoteQueryProps,
} from "../../types/note.type";
import { v4 as uuidv4 } from "uuid";
import {
    getNotes,
    getNote,
    addNote,
    deleteNote,
    updateNote,
} from "../requests";

export const note_query_type = "note";

export function useGetNotesQuery() {
    return useQuery<noteItem[]>(note_query_type, getNotes);
}

export function useGetNoteQuery(noteId: string) {
    return useQuery<noteItem>([note_query_type, noteId], () => {
        return getNote(noteId);
    });
}

export function useAddNoteQuery() {
    const queryClient = useQueryClient();
    return useMutation(
        (note: CreateNoteItemDto) => {
            return addNote(note);
        },
        {
            onMutate: async (note: CreateNoteItemDto) => {
                await queryClient.cancelQueries(note_query_type);

                const previousNotes =
                    queryClient.getQueryData<noteItem[]>(note_query_type);

                queryClient.setQueryData(note_query_type, (oldNotes: any) => {
                    const newNote = { ...note, _id: uuidv4() };
                    return [newNote, ...oldNotes];
                });

                return {
                    previousNotes,
                };
            },
            onError: (_error, _newTodo, context) => {
                queryClient.setQueryData(
                    note_query_type,
                    context?.previousNotes
                );

                // TODO: handle alert
            },
            onSettled: () => {
                queryClient.invalidateQueries(note_query_type);
            },
        }
    );
}

export function useDeleteNoteQuery() {
    const queryClient = useQueryClient();
    return useMutation(
        (noteId: string) => {
            return deleteNote(noteId);
        },
        {
            onMutate: async (noteId: string) => {
                await queryClient.cancelQueries(note_query_type);

                const previousNotes =
                    queryClient.getQueryData<noteItem[]>(note_query_type);

                queryClient.setQueryData<noteItem[]>(
                    note_query_type,
                    (oldNotes) => {
                        if (!oldNotes) return [];
                        return oldNotes.filter(
                            (noteItem: noteItem) => noteItem._id !== noteId
                        );
                    }
                );

                return {
                    previousNotes,
                };
            },
            onError: (_error, _newTodo, context) => {
                queryClient.setQueryData(
                    note_query_type,
                    context?.previousNotes
                );

                // TODO: handle alert
            },
            onSettled: () => {
                queryClient.invalidateQueries(note_query_type);
            },
        }
    );
}

export function useUpdateNoteQuery() {
    const queryClient = useQueryClient();
    return useMutation(
        ({ note, noteId }: UpdateNoteQueryProps) => {
            return updateNote(noteId, note);
        },
        {
            onMutate: async ({ note, noteId }: UpdateNoteQueryProps) => {
                await queryClient.cancelQueries(note_query_type);

                const previousNotes =
                    queryClient.getQueryData<noteItem[]>(note_query_type);

                queryClient.setQueryData<noteItem[]>(
                    note_query_type,
                    (oldNotes) => {
                        if (!oldNotes) return [];
                        return oldNotes.map((oldNote: noteItem) => {
                            if (oldNote._id === noteId) {
                                const updatedNote = { ...oldNote };
                                if (note.title) updatedNote.title = note.title;
                                if (note.content)
                                    updatedNote.content = note.content;
                                return updatedNote;
                            }

                            return oldNote;
                        });
                    }
                );

                return {
                    previousNotes,
                };
            },
            onError: (_error, _newTodo, context) => {
                queryClient.setQueryData(
                    note_query_type,
                    context?.previousNotes
                );
            },
            onSettled: () => {
                queryClient.invalidateQueries(note_query_type);
            },
        }
    );
}
