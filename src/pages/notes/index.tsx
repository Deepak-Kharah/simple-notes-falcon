// components
import NoteAddForm from "../../modules/notes/components/NoteAddForm.component";
import NoteItem from "../../modules/notes/components/NoteItem.component";

import styles from "../../../styles/notes.module.css";

// interfaces
import {
    CreateNoteItemDto,
    noteItem,
} from "../../modules/notes/types/note.type";
import {
    useAddNoteQuery,
    useGetNotesQuery,
} from "../../modules/notes/queries/hooks/note.query";
import { Box } from "@chakra-ui/react";
import NoteSkeleton from "../../modules/notes/components/NoteSkeleton.component";
import Layout from "../../modules/notes/components/Layout.component";
import NoteItems from "../../modules/notes/components/NoteItems.component";

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

    if (isError) {
        return <div>Something went wrong...</div>;
    }
    return (
        <Box>
            <Layout>
                <NoteAddForm
                    onFormSubmit={addNewNote}
                    isFetching={isFetching}
                />

                <Box className={styles["notes-shell"]}>
                    <Box
                        className={styles["notes-container"]}
                        style={{ width: "fit-content" }}
                    >
                        <NoteItems
                            isLoading={isLoading}
                            noteItems={noteItems}
                        />
                    </Box>
                </Box>
            </Layout>
        </Box>
    );
}

Notes.isProtected = true;

export default Notes;
