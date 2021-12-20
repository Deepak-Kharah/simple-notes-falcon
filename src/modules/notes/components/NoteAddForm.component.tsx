import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";

// interfaces

// TODO: a11y for input element

export declare interface NoteFormProps {
    onFormSubmit: (title: string, content: string) => void;
    initialData?: {
        title: string;
        content: string;
    };
}

function NoteForm({
    onFormSubmit = () => {},
    initialData = { title: "", content: "" },
}: NoteFormProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [note, setNote] = useState(initialData);

    useEffect(() => {
        ReactModal.setAppElement("#__next");
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
        if (note.content || note.title) {
            onFormSubmit(note.title, note.content);
        }
        setNote({
            title: "",
            content: "",
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
                        name="content"
                        onChange={handleOnTextChange}
                        value={note.content}
                        autoFocus
                    ></textarea>

                    <button type="submit">close</button>
                </form>
            </ReactModal>
        </div>
    );
}

export default NoteForm;
