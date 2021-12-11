import React, { useState } from "react";
import isHotkey from "is-hotkey";
import { cx } from "@emotion/css";

import styles from "./TodoItem.module.css";

// Interfaces
import { TodoItemProps } from "../../types/todo";

export function TodoItem({
    todoItem,
    onTodoItemEdit,
    onTodoItemChecked,
    onTodoItemDelete,
}: TodoItemProps) {
    const [value, setValue] = useState(todoItem.value);
    const [isEditable, setIsEditable] = useState(false);

    function handleInputOnKeyDown(
        event: React.KeyboardEvent<HTMLParagraphElement>
    ) {
        if (isHotkey("return", event) || isHotkey("escape", event)) {
            event.preventDefault();
            commitValueChange();
        }
    }

    function setTodoEditable() {
        setIsEditable(true);
    }

    function commitValueChange() {
        if (value === "") {
            deleteTodoItem();
        } else if (todoItem.value !== value) {
            onTodoItemEdit(todoItem.key, value);
        }
        setIsEditable(false);
    }

    function handleInputOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value);
    }

    function toggleIsDone() {
        onTodoItemChecked(todoItem.key);
    }

    function deleteTodoItem() {
        onTodoItemDelete(todoItem.key);
    }

    // TODO: select all text on select
    return (
        <div>
            <form>
                <input
                    type="checkbox"
                    name="todo-items"
                    checked={todoItem.isDone}
                    onChange={toggleIsDone}
                />
            </form>
            {isEditable ? (
                <input
                    onKeyDown={handleInputOnKeyDown}
                    type="text"
                    value={value}
                    onChange={handleInputOnChange}
                    onBlur={commitValueChange}
                    autoFocus
                    spellCheck
                />
            ) : (
                <p
                    className={cx({ [styles.active]: todoItem.isDone })}
                    onClick={setTodoEditable}
                >
                    {value}
                </p>
            )}
            <div className="action-buttons">
                <button onClick={deleteTodoItem}>delete</button>
            </div>
        </div>
    );
}
