import { Stack, FormControl, Input, Textarea } from "@chakra-ui/react";
import { Form } from "formik";
import React from "react";
import ResizeTextarea from "react-textarea-autosize";

import styles from "./NoteForm.module.css";

const noteFormField = {
    title: "title",
    content: "content",
} as const;

declare interface Values {
    title: string;
    content: string;
}

export declare interface NoteFormProps {
    handleSubmit: (
        event: React.FormEvent<HTMLFormElement>
    ) => void | Promise<any>;
    handleChange: (values: React.ChangeEvent) => void;
    values: Values;
}

function NoteForm(props: NoteFormProps) {
    const { handleSubmit, handleChange, values } = props;
    return (
        <Form onSubmit={handleSubmit} className={styles["form-container"]}>
            <Stack maxWidth={"50rem"} margin="auto" spacing="5">
                <FormControl id={noteFormField.title} mt="1.5rem">
                    <Input
                        className={styles["title"]}
                        placeholder="Title"
                        variant="unstyled"
                        type="text"
                        name={noteFormField.title}
                        onChange={handleChange}
                        value={values.title}
                    />
                </FormControl>

                <FormControl
                    id={noteFormField.content}
                    style={{ marginTop: "0.5rem" }}
                >
                    <Textarea
                        variant="unstyled"
                        autoFocus
                        placeholder="Release your thoughts..."
                        name={noteFormField.content}
                        onChange={handleChange}
                        value={values.content}
                        minH="unset"
                        overflow="hidden"
                        w="100%"
                        resize="none"
                        minRows={5}
                        as={ResizeTextarea}
                    />
                </FormControl>
            </Stack>
        </Form>
    );
}

export default NoteForm;
