import { v4 as uuidV4 } from "uuid";
import { useState } from "react";

// components
import { TodoItem } from "./components/TodoItem.component";
import { TodoAddForm } from "./components/TodoAddForm.component";

// interfaces
import { todoItem } from "./types/todo.types";

function Todo() {
    const [todoItems, setTodoItems] = useState<todoItem[]>([]);

    function addNewTodoItem(todoValue: string) {
        setTodoItems((existingTodoItems) => [
            { value: todoValue, key: uuidV4(), isDone: false },
            ...existingTodoItems,
        ]);
    }

    function editExistingTodoItem(key: string, todoValue: string) {
        setTodoItems((existingTodoItems) => {
            return existingTodoItems.map((currentTodoItem) => {
                if (currentTodoItem.key === key) {
                    return {
                        value: todoValue,
                        key: key,
                        isDone: currentTodoItem.isDone,
                    };
                } else {
                    return currentTodoItem;
                }
            });
        });
    }

    function toggleIsDone(key: string) {
        setTodoItems((existingTodoItems) => {
            return existingTodoItems.map((currentTodoItem) => {
                if (currentTodoItem.key === key) {
                    return {
                        value: currentTodoItem.value,
                        key: key,
                        isDone: !currentTodoItem.isDone,
                    };
                } else {
                    return currentTodoItem;
                }
            });
        });
    }

    function deleteTodoItem(key: string) {
        setTodoItems((existingTodoItems) => {
            return existingTodoItems.filter((currentTodoItem) => {
                return currentTodoItem.key !== key;
            });
        });
    }

    return (
        <>
            <TodoAddForm onFormSubmit={addNewTodoItem} />
            <div>
                {todoItems.map((todoItem) => {
                    return (
                        <TodoItem
                            todoItem={todoItem}
                            onTodoItemEdit={editExistingTodoItem}
                            onTodoItemChecked={toggleIsDone}
                            onTodoItemDelete={deleteTodoItem}
                            key={todoItem.key}
                        />
                    );
                })}
            </div>
        </>
    );
}

export default Todo;
