import { Stack, FormControl, Input, Textarea, Button } from "@chakra-ui/react";
import { Form } from "formik";
import React from "react";

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
        <Form onSubmit={handleSubmit}>
            <Stack maxWidth={"50rem"} margin="auto" spacing="5">
                <FormControl id={noteFormField.title}>
                    <Input
                        placeholder="Title"
                        variant="outline"
                        type="text"
                        name={noteFormField.title}
                        onChange={handleChange}
                        value={values.title}
                    />
                </FormControl>

                <FormControl id={noteFormField.content}>
                    <Textarea
                        autoFocus
                        placeholder="Release your thoughts..."
                        name={noteFormField.content}
                        onChange={handleChange}
                        value={values.content}
                    />
                </FormControl>

                <Button colorScheme="teal" loadingText={""} type="submit">
                    Submit
                </Button>
            </Stack>
        </Form>
    );
}

export default NoteForm;
