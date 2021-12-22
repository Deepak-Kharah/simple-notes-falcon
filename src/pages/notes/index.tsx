// components
import NoteAddForm from "../../modules/notes/components/NoteAddForm.component";
import NoteItem from "../../modules/notes/components/NoteItem.component";

import styles from "../../../styles/notes.module.css";

// interfaces
import { CreateNoteItemDto } from "../../modules/notes/types/note.type";
import {
    useAddNoteQuery,
    useGetNotesQuery,
} from "../../modules/notes/queries/hooks/note.query";
import { Box } from "@chakra-ui/react";

function Notes() {
    const {
        data: noteItems,
        isError,
        isLoading,
        isFetching,
    } = useGetNotesQuery();

    const { mutate: addNoteMutation } = useAddNoteQuery();

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

    if (isError) {
        return <div>Something went wrong...</div>;
    }
    return (
        <Box>
            {isFetching && <div>fetching...</div>}
            <NoteAddForm onFormSubmit={addNewNote} />
            <div
                className={styles["notes-container"]}
                style={{ width: "fit-content" }}
            >
                {noteItems?.map((noteItem) => {
                    return <NoteItem key={noteItem._id} noteItem={noteItem} />;
                })}
            </div>
        </Box>
    );
}

Notes.isProtected = true;

export default Notes;
