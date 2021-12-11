import { useState } from "react";

import styles from "./NoteItem.module.css";

// interfaces
import { NoteItemProps } from "../types/note.type";
import ReactModal from "react-modal";

function NoteItem({
    noteItem = { description: "", key: "", title: "" },
    onNoteItemDelete = () => {},
    onNoteItemEdit = () => {},
}: NoteItemProps) {
    const [note, setNote] = useState(noteItem);
    const [isModalOpen, setIsModalOpen] = useState(false);

    function updateNote() {
        if (
            noteItem.title !== note.title ||
            noteItem.description !== note.description
        ) {
            onNoteItemEdit(noteItem.key, note.title, note.description);
        }
        setIsModalOpen(false);
    }

    function deleteNote() {
        onNoteItemDelete(note.key);
    }

    function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        updateNote();
    }

    function handleOnTextChange(
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        setNote((prevNote) => {
            return {
                ...prevNote,
                [event.target.name]: event.target.value,
            };
        });
    }

    function openModal() {
        setIsModalOpen(true);
    }

    return (
        <div className={styles["note-container"]}>
            <div className="content" onClick={openModal}>
                <h3>{noteItem.title}</h3>
                <p>{noteItem.description}</p>
            </div>
            <div>
                <button onClick={deleteNote}>delete</button>
            </div>
            <ReactModal isOpen={isModalOpen} onRequestClose={updateNote}>
                <form onSubmit={handleFormSubmit}>
                    <input
                        type="text"
                        name="title"
                        value={note.title}
                        onChange={handleOnTextChange}
                    />
                    <textarea
                        name="description"
                        onChange={handleOnTextChange}
                        value={note.description}
                        autoFocus
                    ></textarea>

                    <button type="submit">close</button>
                </form>
            </ReactModal>
        </div>
    );
}

export default NoteItem;
