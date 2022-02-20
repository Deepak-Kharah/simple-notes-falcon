import { DeleteIcon } from "@chakra-ui/icons";
import {
    Box,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    Tooltip,
    useDisclosure,
} from "@chakra-ui/react";
import { Formik } from "formik";
import React, { useState } from "react";

import NoteForm from "./NoteForm.component";
import styles from "./NoteAddForm.module.css";
import { cx } from "@emotion/css";

// TODO: a11y for input element

export declare interface NoteFormProps {
    onFormSubmit: (title: string, content: string) => void;
    isFetching: boolean;
}

export declare interface NoteAddFooterProps {
    deleteNote: () => void;
    showActions: {
        deleteAction: boolean;
    };
}

function NoteAddFooter({ deleteNote, showActions }: NoteAddFooterProps) {
    const { deleteAction: showDeleteAction = false } = showActions;
    return (
        <Box h={"40px"}>
            {showDeleteAction && (
                <Tooltip
                    label="Delete Note"
                    fontSize="xs"
                    color="gray.700"
                    bgColor="white"
                >
                    <IconButton
                        isRound
                        color="gray.100"
                        variant="ghost"
                        aria-label="Delete note"
                        icon={<DeleteIcon color="gray.600" />}
                        onClick={deleteNote}
                    />
                </Tooltip>
            )}
        </Box>
    );
}

function AddNoteComponent(props: NoteFormProps) {
    const { onFormSubmit = () => {}, isFetching = false } = props;
    const [showActions, setShowActions] = useState({ deleteAction: false });
    const { isOpen: isModalOpen, onClose, onOpen: openModal } = useDisclosure();

    function addNewNote(note: { title: string; content: string }) {
        const trimmedTitle = note.title.trim();
        const trimmedContent = note.content.trim();

        if (trimmedTitle || trimmedContent) {
            onFormSubmit(trimmedTitle, trimmedContent);
        }

        onClose();
    }

    function validateForm(values: { title: string; content: string }) {
        if (!values.title && !values.content) {
            setShowActions((prevActions) => {
                return {
                    ...prevActions,
                    deleteAction: false,
                };
            });
        } else {
            setShowActions((prevActions) => {
                return {
                    ...prevActions,
                    deleteAction: true,
                };
            });
        }
    }

    return (
        <Box className={styles["note-add-container"]}>
            <Input
                maxW={"2xl"}
                readOnly
                onClick={openModal}
                placeholder="Take a note..."
            />

            <Formik
                onSubmit={addNewNote}
                initialValues={{ title: "", content: "" }}
                validate={validateForm}
            >
                {({ handleChange, handleSubmit, values, resetForm }) => (
                    <Modal
                        isOpen={isModalOpen}
                        onClose={handleSubmit}
                        size={"lg"}
                        scrollBehavior="inside"
                        returnFocusOnClose={false}
                    >
                        <ModalOverlay />
                        <ModalContent>
                            <ModalBody>
                                <NoteForm
                                    handleChange={handleChange}
                                    handleSubmit={handleSubmit}
                                    values={values}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <NoteAddFooter
                                    deleteNote={() => {
                                        resetForm();
                                        onClose();
                                    }}
                                    showActions={showActions}
                                />
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                )}
            </Formik>
            <div
                className={cx(styles["notes-loader"], {
                    [styles["show"]]: isFetching,
                })}
            >
                <div></div>
            </div>
        </Box>
    );
}

export default AddNoteComponent;
