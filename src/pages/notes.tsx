import { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { useMutation, useQuery } from "react-query";

// components
import NoteAddForm from "../modules/notes/components/NoteAddForm.component";
import NoteItem from "../modules/notes/components/NoteItem.component";

import styles from "../../styles/notes.module.css";

// interfaces
import { CreateNoteItemDto, noteItem } from "../modules/notes/types/note.type";
import {
    useAddNoteQuery,
    useDeleteNoteQuery,
    useGetNotesQuery,
    useUpdateNoteQuery,
} from "../modules/notes/queries/hooks/note.query";

function Notes() {
    const {
        data: noteItems,
        isError,
        error,
        isLoading,
        isFetching,
    } = useGetNotesQuery();

    const { mutate: addNoteMutation } = useAddNoteQuery();
    const { mutate: deleteNoteMutation } = useDeleteNoteQuery();
    const { mutate: updateNoteMutation, status: updateStatus } =
        useUpdateNoteQuery();

    if (isLoading) {
        console.log("loading notes");
    }

    if (isError) {
        console.log(error);
    }

    function addNewNote(title: string, content: string) {
        const newNote: CreateNoteItemDto = {
            title,
            content,
        };
        addNoteMutation(newNote);
    }

    if (isLoading) {
        return <div>Notes are loading...</div>;
    }
    return (
        <div>
            {isFetching && <div>fetching...</div>}
            <NoteAddForm onFormSubmit={addNewNote} />
            <div className={styles["notes-container"]}>
                {noteItems?.map((noteItem) => {
                    return (
                        <NoteItem
                            updateStatus={updateStatus}
                            key={noteItem._id}
                            noteItem={noteItem}
                            onNoteItemEdit={updateNoteMutation}
                            onNoteItemDelete={deleteNoteMutation}
                        />
                    );
                })}
            </div>
        </div>
    );
}

Notes.isProtected = true;

export default Notes;
