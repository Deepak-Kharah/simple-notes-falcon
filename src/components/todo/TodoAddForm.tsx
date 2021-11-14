import React, { useState } from "react";
import { TodoAddFormProps } from "../../types/todo";

export function TodoAddForm({ onFormSubmit }: TodoAddFormProps) {
    const [todoValue, setTodoValue] = useState("");

    function handleFormInputOnChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        setTodoValue(event.target.value);
    }

    function handleFormOnSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        onFormSubmit(todoValue);
        setTodoValue("");
    }

    return (
        <form onSubmit={handleFormOnSubmit}>
            <input
                onChange={handleFormInputOnChange}
                type="text"
                value={todoValue}
            />
            <button type="submit">Todo</button>
        </form>
    );
}
