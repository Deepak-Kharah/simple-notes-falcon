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
    IconButton,
    Tooltip,
    ModalFooter,
    Text,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import moment from "moment";
import { Formik } from "formik";

import styles from "./NoteItem.module.css";

import { noteItem } from "../types/note.type";
import NoteForm from "./NoteForm.component";
import {
    useDeleteNoteQuery,
    useUpdateNoteQuery,
} from "../queries/hooks/note.query";

export declare interface NoteItemProps {
    noteItem: noteItem;
}

function NoteItemFooter({ deleteNote }: { deleteNote: () => void }) {
    return (
        <Box>
            <Tooltip
                label="Delete Note"
                fontSize="xs"
                color="gray.700"
                bgColor="white"
            >
                <IconButton
                    className={styles["delete-button"]}
                    isRound
                    color="gray.100"
                    variant="ghost"
                    aria-label="Delete note"
                    icon={<DeleteIcon color="gray.400" />}
                    onClick={deleteNote}
                />
            </Tooltip>
        </Box>
    );
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
                    <Box className={styles["content"]}>
                        <h3 className={styles["note-title"]}>
                            {noteItem.title}
                        </h3>
                        <Text noOfLines={6} as="p">
                            {noteItem.content}
                        </Text>
                    </Box>
                </Link>
                <Box className={styles["footer"]}>
                    <NoteItemFooter deleteNote={deleteNote} />
                </Box>
            </Box>

            <Formik
                initialValues={{
                    title: noteItem.title,
                    content: noteItem.content,
                }}
                onSubmit={updateNote}
            >
                {({ handleSubmit, handleChange, values }) => (
                    <Modal
                        isOpen={isModalOpen}
                        onClose={handleSubmit}
                        size={"lg"}
                        scrollBehavior="inside"
                    >
                        <ModalOverlay />
                        <ModalContent>
                            <ModalBody>
                                <NoteForm
                                    handleChange={handleChange}
                                    handleSubmit={handleSubmit}
                                    values={values}
                                />
                                <Box className={styles["timestamp"]}>
                                    <Text color={"gray.500"} fontSize={"xs"}>
                                        Last edited,{" "}
                                        {moment(noteItem.updatedAt).fromNow()}
                                    </Text>
                                </Box>
                            </ModalBody>
                            <ModalFooter>
                                <NoteItemFooter deleteNote={deleteNote} />
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                )}
            </Formik>
        </>
    );
}

export default NoteItem;
