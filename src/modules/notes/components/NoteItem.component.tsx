import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    useDisclosure,
    Box,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { noteItem } from "../types/note.type";

import styles from "./NoteItem.module.css";

import NoteForm from "./NoteForm.component";
import {
    useDeleteNoteQuery,
    useUpdateNoteQuery,
} from "../queries/hooks/note.query";

export declare interface NoteItemProps {
    noteItem: noteItem;
}

function NoteItem({
    noteItem = {
        content: "",
        _id: "",
        title: "",
        createdAt: "",
        updatedAt: "",
    },
}: NoteItemProps) {
    const { isOpen: isModalOpen, onClose, onOpen: openModal } = useDisclosure();
    const router = useRouter();
    const noteId = (router.query.noteId as string) || undefined;

    const { mutate: deleteNoteMutation } = useDeleteNoteQuery();
    const { mutate: updateNoteMutation } = useUpdateNoteQuery();

    useEffect(() => {
        if (noteId === noteItem._id) {
            openModal();
        } else if (!noteId) {
            onClose();
        }
    }, [noteId, noteItem._id]);

    function updateNote(note: { title: string; content: string }) {
        if (
            noteItem.title !== note.title ||
            noteItem.content !== note.content
        ) {
            updateNoteMutation({ note: note, noteId: noteItem._id });
        }
        router.push("/notes");

        onClose();
    }

    function deleteNote() {
        deleteNoteMutation(noteItem._id);
    }

    return (
        <>
            <Box className={styles["note-container"]}>
                <Link
                    href={`/notes?noteId=${noteItem._id}`}
                    as={`/notes/${noteItem._id}`}
                >
                    <div className="content">
                        <h3>{noteItem.title}</h3>
                        <p>{noteItem.content}</p>
                    </div>
                </Link>
                <div>
                    <button onClick={deleteNote}>delete</button>
                </div>
            </Box>

            <Formik
                initialValues={{
                    title: noteItem.title,
                    content: noteItem.content,
                }}
                onSubmit={updateNote}
            >
                {({ handleSubmit, handleChange, values }) => (
                    <Modal isOpen={isModalOpen} onClose={handleSubmit}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalBody>
                                <NoteForm
                                    handleChange={handleChange}
                                    handleSubmit={handleSubmit}
                                    values={values}
                                />
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                )}
            </Formik>
        </>
    );
}

export default NoteItem;
