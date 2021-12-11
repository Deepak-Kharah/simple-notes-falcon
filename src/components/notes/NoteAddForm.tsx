import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";

// interfaces
import { NoteAddFormProps } from "../../types/notes";

// TODO: a11y for input element

function NoteAddForm({ onFormSubmit = () => {} }: NoteAddFormProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [note, setNote] = useState({ title: "", description: "" });

    useEffect(() => {
        ReactModal.setAppElement("body");
    }, []);

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

    function addNewNote() {
        if (note.description || note.title) {
            onFormSubmit(note.title, note.description);
        }
        setNote({
            title: "",
            description: "",
        });
        setIsModalOpen(false);
    }

    function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        addNewNote();
    }

    return (
        <div>
            <button
                onClick={() => {
                    setIsModalOpen((prev) => !prev);
                }}
            >
                click me
            </button>
            <ReactModal isOpen={isModalOpen} onRequestClose={addNewNote}>
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

export default NoteAddForm;
