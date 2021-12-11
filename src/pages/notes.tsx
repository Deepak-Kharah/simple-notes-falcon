import { useState } from "react";
import { v4 as uuidV4 } from "uuid";

// components
import NoteAddForm from "../modules/notes/components/NoteAddForm.component";
import NoteItem from "../modules/notes/components/NoteItem.component";

import styles from "../../styles/notes.module.css";

// interfaces
import { noteItem } from "../modules/notes/types/note.type";

function Notes() {
    const [noteItems, setNoteItems] = useState<noteItem[]>([]);

    function addNewNote(title: string, description: string) {
        setNoteItems((previousNotes) => {
            return [
                { title: title, description: description, key: uuidV4() },
                ...previousNotes,
            ];
        });
    }

    function updateNote(key: string, title: string, description: string) {
        setNoteItems((previousNotes) => {
            return previousNotes.map((previousNote) => {
                if (previousNote.key === key) {
                    return { key, title, description };
                } else {
                    return previousNote;
                }
            });
        });
    }

    function deleteNote(key: string) {
        setNoteItems((previousNotes) => {
            return previousNotes.filter((previousNote) => {
                return previousNote.key !== key;
            });
        });
    }

    return (
        <div>
            <NoteAddForm onFormSubmit={addNewNote} />
            <div className={styles["notes-container"]}>
                {noteItems.map((noteItem) => {
                    return (
                        <NoteItem
                            key={noteItem.key}
                            noteItem={noteItem}
                            onNoteItemEdit={updateNote}
                            onNoteItemDelete={deleteNote}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Notes;
