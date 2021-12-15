import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
    CreateNoteItemDto,
    noteItem,
    UpdateNoteQueryProps,
} from "../../types/note.type";
import { v4 as uuidv4 } from "uuid";

export const note_query_type = "note";

export function useGetNotesQuery() {
    return useQuery<noteItem[]>(note_query_type, () => {
        return axios.get("/notes").then((res) => res.data);
    });
}

export function useAddNoteQuery() {
    const queryClient = useQueryClient();
    return useMutation(
        (note: CreateNoteItemDto) => {
            return axios.post<noteItem>("/notes", note).then((res) => res.data);
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
            return axios
                .delete<noteItem>(`/notes/${noteId}`)
                .then((res) => res.data);
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
            return axios
                .patch<noteItem>(`/notes/${noteId}`, note)
                .then((res) => res.data);
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
        }
    );
}
